import json
import math
import os
import threading
import time
import uuid
from collections import Counter
from contextlib import contextmanager
from pathlib import Path
from typing import Any

from . import validators
from . import calibration


QUEUE_DIR = Path(os.environ.get("CODERPUZZLE_QUEUE_DIR", ".queue"))
_configured_runner_timeout = float(os.environ.get("CODERPUZZLE_RUNNER_TIMEOUT_SECONDS", "20"))
_calibration = calibration.load() or {}
_calibration_timeout = max((int(row.get("timeout_ms", 0)) for row in _calibration.get("records", [])), default=0) / 1000
RUNNER_TIMEOUT = max(_configured_runner_timeout, _calibration_timeout + 10)

# Every testcase runs in its own sandboxed process, so a job's wall time is
# set by a fixed per-case cost — roughly 0.22 s for python3 and 0.05 s for the
# compiled languages, whatever the solution itself does with a five-element
# input — and not by the submission's own runtime. A bundle whose corpus was
# generated into the tens of thousands of cases therefore takes hours: the
# largest here hold 19,929, and 5,585 already exceeds any sane deadline in
# python3. Jobs judge a deterministic subset instead, and the runner wait
# scales with the subset that was actually sent.
MAX_JUDGED_CASES = max(1, int(os.environ.get("CODERPUZZLE_MAX_JUDGED_CASES", "200")))
PER_CASE_RUNNER_SECONDS = float(os.environ.get("CODERPUZZLE_PER_CASE_RUNNER_SECONDS", "0.25"))
JOB_HEADROOM = float(os.environ.get("CODERPUZZLE_JOB_HEADROOM", "3"))

# A calibration record's `timeout_ms` is ten times the whole reference sweep,
# so dividing it by the case count yields ten times the *average* case. That
# suits the hand-written corpora — dozens of similar cases — but not the
# generated ones, whose distribution is a long tail. Once a job judges only
# the heaviest cases the average sits far under what the reference itself
# needs: measured on the deployment host, the slowest case of
# armstrong-number/python3 takes 264 ms against the 23 ms an average-derived
# budget allows, and the reference fails its own calibration as a result. The
# deadline is therefore ten times whichever of the two is larger, which is
# the old value whenever the average already predicts the slowest case and
# the sweep records no slowest case at all.
PER_CASE_REFERENCE_MULTIPLE = max(1, int(os.environ.get("CODERPUZZLE_PER_CASE_REFERENCE_MULTIPLE", "10")))


def per_case_timeout_ms(calibrated: dict[str, Any]) -> int:
    """The per-case deadline a calibration record implies."""
    slowest = calibrated.get("slowest_case_ms")
    slowest = slowest if isinstance(slowest, (int, float)) and slowest > 0 else 0
    case_count = max(1, int(calibrated.get("case_count") or 1))
    average = calibrated["timeout_ms"] / PER_CASE_REFERENCE_MULTIPLE / case_count
    return max(1, int(PER_CASE_REFERENCE_MULTIPLE * max(slowest, average)))


class RunnerUnavailable(RuntimeError):
    pass


def prune_stale_jobs() -> int:
    """Drop queue entries nobody is waiting for.

    A job directory outlives its client only when the API process died
    mid-wait — a deploy, a crash, an OOM — because that skips the cleanup in
    _submit. The runner serves the oldest `ready` job first, so a single such
    entry pins it to work no one will read and every job behind it waits out
    its whole deadline. Called once at startup, when nothing can be waiting on
    this queue: the deployment runs one API replica, and the runner holds no
    client of its own.
    """
    removed = 0
    try:
        entries = list(QUEUE_DIR.glob("*"))
    except OSError:
        return 0
    for job_dir in entries:
        if not job_dir.is_dir():
            continue
        try:
            for path in job_dir.iterdir():
                path.unlink(missing_ok=True)
            job_dir.rmdir()
            removed += 1
        except OSError:
            continue
    return removed


def job_timeout_seconds(case_count: int, calibrated: dict[str, Any] | None = None) -> float:
    """How long to wait for one job carrying this many cases.

    A job's wall time is set by its case count rather than by the submission,
    so the wait is sized from the cases actually sent: the configured floor
    covers small jobs, and a full-size selection gets the budget it was
    bounded for.

    A calibrated pair brings a better number, because one constant cannot fit
    every language. What a job mostly spends is the fixed cost of starting a
    case, not the submission: a capped python3 job runs 43 s of which the
    reference's own algorithm is under a second, while the same corpus in cpp
    takes 8.8 s. At the shared constant a python3 submission had 17 s of room
    for its own work before the API stopped waiting and returned a 503 rather
    than a verdict. `observed_job_ms` is that pair's reference measured end to
    end by the sweep, so the wait follows what this problem in this language
    actually costs, and the multiple on top is headroom for a solution slower
    than the reference. It only ever raises the wait: a pair whose measured
    job fits the shared budget keeps it.
    """
    budget = case_count * PER_CASE_RUNNER_SECONDS + 10
    record = calibrated or {}
    observed = record.get("observed_job_ms")
    if isinstance(observed, (int, float)) and observed > 0:
        per_case = observed / max(1, int(record.get("case_count") or 1))
        budget = max(budget, per_case * case_count * JOB_HEADROOM / 1000)
    return max(RUNNER_TIMEOUT, budget)


def _case_weight(case: dict[str, Any]) -> int:
    """Rank a case by the size of its input.

    Only ever used to order cases for selection, never judged: the corpus's
    large inputs are where complexity and boundary handling actually differ,
    so they earn a place ahead of the generated middle.
    """
    try:
        return len(json.dumps(case.get("input"), separators=(",", ":"), ensure_ascii=False))
    except (TypeError, ValueError):
        return 0


def select_cases(
    cases: list[dict[str, Any]],
    public_count: int,
    limit: int | None = None,
) -> list[int]:
    """The indices of the cases one job executes, in their original order.

    Public cases are the statement's own examples, so they always run. The
    rest of the budget goes half to the largest inputs and half to an even
    stride across what remains, which keeps a thin but broad sample of the
    corpus's middle. A pure function of the case list, so a submission, its
    calibration record, and any later re-judge all pick the same cases.
    """
    limit = MAX_JUDGED_CASES if limit is None else max(1, limit)
    if len(cases) <= limit:
        return list(range(len(cases)))
    chosen = set(range(min(public_count, limit)))
    hidden = list(range(public_count, len(cases)))
    slots = limit - len(chosen)
    if slots <= 0 or not hidden:
        return sorted(chosen)
    # Half the remaining budget to the corpus's largest inputs, half to an
    # even stride across everything else.
    ranked = sorted(hidden, key=lambda index: (-_case_weight(cases[index]), index))
    chosen.update(ranked[: slots // 2])
    rest = [index for index in hidden if index not in chosen]
    remaining = limit - len(chosen)
    if remaining > 0 and rest:
        stride = len(rest) / remaining
        chosen.update(rest[min(int(k * stride), len(rest) - 1)] for k in range(remaining))
    return sorted(chosen)


# The runner executes one job at a time, so letting every request enqueue
# just lengthens everyone's wait while pinning a worker thread apiece for
# the full poll timeout. A small slot count bounds how many jobs wait on
# the runner at once; saturation raises RunnerUnavailable, which the
# endpoints translate into an immediate 503.
JUDGE_CONCURRENCY = max(1, int(os.environ.get("CODERPUZZLE_JUDGE_CONCURRENCY", "2")))
_judge_slots = threading.BoundedSemaphore(JUDGE_CONCURRENCY)


@contextmanager
def judge_slot():
    """Hold one of the few in-flight judge jobs (queue wait included)."""
    if not _judge_slots.acquire(blocking=False):
        raise RunnerUnavailable("The judge is busy; try again in a moment")
    try:
        yield
    finally:
        _judge_slots.release()


DEFAULT_CLOSE_TOLERANCE = 1e-9


def _close_enough(actual: Any, expected: Any, tolerance: float) -> bool:
    """Per-scalar tolerant comparison: numbers may differ by the given
    relative (and absolute) tolerance; structure must match exactly."""
    if isinstance(actual, bool) or isinstance(expected, bool):
        return actual is expected
    if isinstance(actual, (int, float)) and isinstance(expected, (int, float)):
        return math.isclose(actual, expected, rel_tol=tolerance, abs_tol=tolerance)
    if isinstance(actual, list) and isinstance(expected, list):
        return len(actual) == len(expected) and all(_close_enough(a, e, tolerance) for a, e in zip(actual, expected))
    if isinstance(actual, dict) and isinstance(expected, dict):
        return actual.keys() == expected.keys() and all(
            _close_enough(actual[key], expected[key], tolerance) for key in actual
        )
    return actual == expected


def _distribution_ok(actual: Any, spec: dict[str, Any]) -> bool:
    """Statistical judging for randomized methods (LeetCode semantics).

    The harness reports a frequency table {canonical value: count} over
    `repeat` draws; the case carries the expected distribution as
    {"mode": "distribution", "repeat": K, "tolerance": t,
     "probabilities": {canonical: p}}. Every observed value must be valid
    (a known key), the total must be K, and each bucket with enough
    expected mass must land within the relative tolerance band. Small
    buckets merge into one tail bucket so rare outcomes cannot flake."""
    if not isinstance(actual, dict):
        return False
    repeat = int(spec.get("repeat", 0))
    tolerance = float(spec.get("tolerance", 0.10))
    probabilities = spec.get("probabilities")
    if repeat <= 0 or not isinstance(probabilities, dict):
        return False
    if sum(actual.values()) != repeat:
        return False
    if any(key not in probabilities for key in actual):
        return False
    min_bucket = 10.0
    tail_expected = 0.0
    tail_actual = 0
    for key, probability in probabilities.items():
        expected_count = float(probability) * repeat
        actual_count = actual.get(key, 0)
        if expected_count >= min_bucket:
            # The band is the wider of the relative tolerance and 4.0
            # binomial standard deviations, so a correct sampler never
            # flakes while a genuinely biased one still fails (4 sigma
            # puts a per-cell two-sided miss near 6e-5, invisible even
            # across a 10_000-cell table).
            sigma = math.sqrt(expected_count * (1.0 - float(probability)))
            band = max(tolerance * expected_count, 4.0 * sigma)
            if abs(actual_count - expected_count) > band:
                return False
        else:
            tail_expected += expected_count
            tail_actual += actual_count
    if tail_expected > 0 or tail_actual > 0:
        if abs(tail_actual - tail_expected) > max(tolerance * tail_expected, min_bucket):
            return False
    return True


def _grouped_ok(actual: Any, spec: dict[str, Any]) -> bool:
    if not isinstance(actual, list):
        return False
    size = int(spec.get("size", 0))
    counts = spec.get("counts")
    if size <= 0 or not isinstance(counts, dict):
        return False
    total = int(spec.get("total", len(actual)))
    if len(actual) != total or total % size != 0:
        return False
    try:
        for start in range(0, total, size):
            group = Counter(actual[start : start + size])
            if group != Counter({token: int(n) for token, n in counts.items()}):
                return False
    except TypeError:
        # The harness records whatever value the solution passed, so a
        # wrong-typed element (a list where a hashable was expected) makes
        # the multiset comparison impossible — that is a wrong answer, not
        # a judge failure.
        return False
    return True


def _compare(actual: Any, expected: Any, comparison: Any, case_input: Any = None) -> bool:
    # Design outputs are per-action lists; a statistical action's expected
    # element is a distribution spec compared against the harness frequency
    # table while every other element stays exact. Validator specs accept any
    # output meeting the named semantic predicate (case input is threaded so
    # the validator can judge "any valid answer" contracts).
    if isinstance(expected, list) and any(
        isinstance(element, dict)
        and element.get("mode") in {"distribution", "any_of", "opaque", "grouped", "validator"}
        for element in expected
    ):
        return (
            isinstance(actual, list)
            and len(actual) == len(expected)
            and all(_compare(a, e, "exact", case_input) for a, e in zip(actual, expected))
        )
    if isinstance(expected, dict) and expected.get("mode") == "validator":
        return validators.validate(expected.get("name"), actual, expected.get("params"), case_input, expected)
    if isinstance(expected, dict) and expected.get("mode") == "distribution":
        return _distribution_ok(actual, expected)
    # {"mode": "any_of", "values": [...]} accepts any listed answer, the way
    # LeetCode accepts either key when two share the extreme count.
    if isinstance(expected, dict) and expected.get("mode") == "any_of":
        return any(_compare(actual, candidate, comparison) for candidate in expected.get("values", []))
    # {"mode": "opaque"} accepts any value: the slot is an intermediate whose
    # format the problem deliberately leaves free (a serialize call whose
    # output only has to round-trip back through deserialize).
    if isinstance(expected, dict) and expected.get("mode") == "opaque":
        return True
    # {"mode": "grouped", "size": 3, "counts": {"H": 2, "O": 1}} judges a
    # concurrent log by its structural invariant: a correct program has many
    # valid interleavings, but every consecutive group must hold exactly
    # these counts (two hydrogen and one oxygen per water molecule).
    if isinstance(expected, dict) and expected.get("mode") == "grouped":
        return _grouped_ok(actual, expected)
    if comparison == "exact":
        return actual == expected
    if comparison == "close" or (isinstance(comparison, dict) and comparison.get("mode") == "close"):
        tolerance = (
            float(comparison.get("tolerance", DEFAULT_CLOSE_TOLERANCE))
            if isinstance(comparison, dict)
            else DEFAULT_CLOSE_TOLERANCE
        )
        return _close_enough(actual, expected, tolerance)
    if comparison in {"sorted", "multiset", "set"}:
        if not isinstance(actual, list) or not isinstance(expected, list):
            return False
        normalize = lambda value: json.dumps(value, sort_keys=True, separators=(",", ":"))
        normalized_actual = list(map(normalize, actual))
        normalized_expected = list(map(normalize, expected))
        if comparison == "sorted":
            return sorted(normalized_actual) == sorted(normalized_expected)
        if comparison == "multiset":
            return Counter(normalized_actual) == Counter(normalized_expected)
        return set(normalized_actual) == set(normalized_expected)
    raise ValueError(f"Unsupported comparison: {comparison}")


def _display_input(invocation: dict[str, Any], raw_input: Any) -> Any:
    invocation_type = invocation.get("type", "function")
    if invocation_type == "function" and isinstance(raw_input, list):
        names = [parameter["name"] for parameter in invocation.get("parameters", [])]
        return dict(zip(names, raw_input))
    if invocation_type == "sql" and isinstance(raw_input, list) and raw_input:
        # a sql case's display form is its setup text, shown verbatim
        return raw_input[0]
    return raw_input


def _submit(request_body: dict[str, Any], calibrated: dict[str, Any] | None = None) -> dict[str, Any]:
    """Hand one job to the isolated runner and wait for its answer.

    The queue is a directory the runner watches; `job_id` is filled in here so
    every caller's request carries the same identity the response is matched
    on. The job directory is always torn down, whether the runner answered,
    failed, or never showed up.
    """
    QUEUE_DIR.mkdir(parents=True, exist_ok=True)
    if not os.access(QUEUE_DIR, os.R_OK | os.W_OK | os.X_OK):
        raise RunnerUnavailable("The isolated judge queue is not accessible")
    job_id = uuid.uuid4().hex
    job_dir = QUEUE_DIR / job_id
    job_dir.mkdir(mode=0o770)
    job_dir.chmod(0o770)
    request_path = job_dir / "request.json"
    ready_path = job_dir / "ready"
    result_path = job_dir / "result.json"
    request_path.write_text(
        json.dumps({**request_body, "job_id": job_id, "enqueued_at_ns": time.monotonic_ns()}), encoding="utf-8"
    )
    ready_path.touch(mode=0o600)

    deadline = time.monotonic() + job_timeout_seconds(len(request_body.get("cases", [])), calibrated)
    try:
        while time.monotonic() < deadline:
            if result_path.exists():
                return json.loads(result_path.read_text(encoding="utf-8"))
            time.sleep(0.025)
        raise RunnerUnavailable("The isolated runner did not respond in time")
    finally:
        for path in (ready_path, request_path, result_path):
            path.unlink(missing_ok=True)
        try:
            job_dir.rmdir()
        except OSError:
            pass


def format_code_report(code: str, language: str) -> dict[str, Any]:
    """Tri-state format result from the runner's toolchain.

    {"status": "formatted"} — already conforming, nothing to change;
    {"status": "unformatted", "code": ...} — parses; this is the
    formatted text; {"status": "error", "diagnostics": ...} — the source
    does not parse (the author's to fix, not a judge failure).
    """
    response = _submit({"version": 2, "kind": "format", "language": language, "code": code})
    if "code" not in response:
        return {
            "status": "error",
            "diagnostics": response.get("error") or "The source could not be formatted",
        }
    if response["code"] == code:
        return {"status": "formatted"}
    return {"status": "unformatted", "code": response["code"]}


def execute(
    code: str,
    language: str,
    invocation: dict[str, Any],
    limits: dict[str, Any],
    cases: list[dict[str, Any]],
    public_count: int,
    assembly: dict[str, dict[str, str]] | None = None,
    calibrated: dict[str, Any] | None = None,
) -> list[dict[str, Any]]:
    body = {
        "version": 2,
        "language": language,
        "code": code,
        "invocation": invocation,
        "limits": limits,
        # Expected values deliberately remain in the API trust boundary.
        "cases": [{"input": case["input"]} for case in cases],
    }
    if assembly:
        body["assembly"] = assembly
    response = _submit(body, calibrated)
    raw_results = response["results"]

    comparison = invocation.get("comparison", "exact")
    results = []
    if len(raw_results) < len(cases):
        raw_results.extend(
            {"status": "system_error", "error": "Runner returned an incomplete result", "runtime_ms": 0}
            for _ in range(len(cases) - len(raw_results))
        )
    for index, (case, raw) in enumerate(zip(cases, raw_results)):
        visible = index < public_count
        status = raw["status"]
        passed = status == "completed" and _compare(raw.get("actual"), case["expected"], comparison, case.get("input"))
        result = {
            "index": index,
            "name": case.get("name", f"Case {index + 1}") if visible else f"Hidden case {index - public_count + 1}",
            "status": "accepted" if passed else ("wrong_answer" if status == "completed" else status),
        }
        result["timing_mode"] = raw.get("timing_mode", response.get("timing_mode", "wall"))
        result["resource_profile"] = raw.get("resource_profile", response.get("resource_profile", "shared-wall-v1"))
        if index == 0:
            result["_judge_job_id"] = response.get("job_id")
            result["_queue_ms"] = response.get("queue_ms", 0)
            result["_compile_ms"] = response.get("compile_ms", 0)
        for metric in ("cpu_time_ms", "wall_time_ms"):
            if metric in raw:
                result[metric if visible else "_" + metric] = raw[metric]
        if visible:
            for metric in (
                "cpu_limit_ms",
                "wall_limit_ms",
                "limit_mode",
                "timeout_reason",
                "memory_peak_bytes",
                "cpu_throttled_ms",
            ):
                if metric in raw:
                    result[metric] = raw[metric]
            result.update(
                {
                    "runtime_ms": raw.get("runtime_ms", 0),
                    "timeout_ms": raw.get("timeout_ms"),
                    "input": _display_input(invocation, case["input"]),
                    "expected": case["expected"],
                    "actual": raw.get("actual"),
                    "stdout": raw.get("stdout", ""),
                    "error": raw.get("error"),
                }
            )
        else:
            # Keep the duration private long enough to form an honest aggregate,
            # then remove it in _summarize before results cross the API boundary.
            result["_runtime_ms"] = raw.get("runtime_ms", 0)
            if status not in {"completed"}:
                hidden_errors = {
                    "runtime_error": "Solution raised an error on a hidden testcase",
                    "time_limit_exceeded": "Solution exceeded the execution time budget on a hidden testcase",
                    "memory_limit_exceeded": "Solution exceeded the memory limit on a hidden testcase",
                    "skipped": "Testcase was not run after an earlier execution failure",
                }
                result["error"] = hidden_errors.get(status, "Execution failed on a hidden testcase")
        results.append(result)
    return results
