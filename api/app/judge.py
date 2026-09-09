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


QUEUE_DIR = Path(os.environ.get("CODERPUZZLE_QUEUE_DIR", ".queue"))
RUNNER_TIMEOUT = float(os.environ.get("CODERPUZZLE_RUNNER_TIMEOUT_SECONDS", "20"))


class RunnerUnavailable(RuntimeError):
    pass


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
        return len(actual) == len(expected) and all(
            _close_enough(a, e, tolerance) for a, e in zip(actual, expected)
        )
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
        return validators.validate(
            expected.get("name"), actual, expected.get("params"), case_input, expected
        )
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
    if comparison == "close" or (
        isinstance(comparison, dict) and comparison.get("mode") == "close"
    ):
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


def _submit(request_body: dict[str, Any]) -> dict[str, Any]:
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
    request_path.write_text(json.dumps({**request_body, "job_id": job_id}), encoding="utf-8")
    ready_path.touch(mode=0o600)

    deadline = time.monotonic() + RUNNER_TIMEOUT
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
    raw_results = _submit(body)["results"]

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
        passed = status == "completed" and _compare(
            raw.get("actual"), case["expected"], comparison, case.get("input")
        )
        result = {
            "index": index,
            "name": case.get("name", f"Case {index + 1}") if visible else f"Hidden case {index - public_count + 1}",
            "status": "accepted" if passed else ("wrong_answer" if status == "completed" else status),
        }
        if visible:
            result.update({
                "runtime_ms": raw.get("runtime_ms", 0),
                "timeout_ms": raw.get("timeout_ms"),
                "input": _display_input(invocation, case["input"]),
                "expected": case["expected"],
                "actual": raw.get("actual"),
                "stdout": raw.get("stdout", ""),
                "error": raw.get("error"),
            })
        else:
            # Keep the duration private long enough to form an honest aggregate,
            # then remove it in _summarize before results cross the API boundary.
            result["_runtime_ms"] = raw.get("runtime_ms", 0)
            if status not in {"completed"}:
                hidden_errors = {
                    "runtime_error": "Solution raised an error on a hidden testcase",
                    "time_limit_exceeded": "Solution exceeded the calibrated deadline on a hidden testcase",
                    "memory_limit_exceeded": "Solution exceeded the memory limit on a hidden testcase",
                    "skipped": "Testcase was not run after an earlier execution failure",
                }
                result["error"] = hidden_errors.get(status, "Execution failed on a hidden testcase")
        results.append(result)
    return results
