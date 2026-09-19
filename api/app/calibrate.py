"""Create deployment-local reference timing calibration records.

Run from the API image after the problems cache and runner are available:
``python -m app.calibrate``.  Use ``--recalibrate`` to replace an existing
record atomically.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import logging
import os
import platform
import re
import tempfile
import time
import urllib.request
from pathlib import Path

from . import calibration
from .main import _run_judge
from . import judge
from .problems import (
    EXTENSION_LANGUAGE,
    list_problems,
    load_all_cases,
    load_designated_reference,
    load_problem,
    safe_problem_path,
    starter_languages,
)


LOG = logging.getLogger("coderpuzzle.calibrate")
PROGRESS_FILE = calibration.CALIBRATION_DIR / "calibration-progress.json"

# A reference that fails is news about one bundle; a long unbroken run of
# them is news about the host. The 2026-09-14 sweep filled the runner's
# /tmp and then recorded 8,551 "reference failures" across the remaining
# ~1,180 problems in every language — a poisoned matrix that looked
# complete. Stop instead: the checkpoint survives, so a fixed host resumes
# exactly where the breaker tripped.
CONSECUTIVE_FAILURE_LIMIT = int(os.environ.get("CODERPUZZLE_CALIBRATION_FAILURE_LIMIT", "40"))
# Measuring is not judging. A bundle's time_ms is the deadline a *submission*
# is held to, and holding the reference to it as well means a pair can become
# unmeasurable for being merely slow: maximum-good-subtree-score/python3 needs
# about 2.5 s on its one large case against a 1500 ms nominal, so the sweep
# recorded a failure for a reference that is perfectly correct. The ceiling
# here exists only to stop a runaway reference, and what the reference
# actually costs is then written into the record -- which is what every
# derived deadline is built from anyway.
MEASUREMENT_HEADROOM = max(1, int(os.environ.get("CODERPUZZLE_CALIBRATION_HEADROOM", "10")))
# The runner refuses a budget outside 1..60000 ms, and it multiplies the
# language's deadline factor -- clamped at 3.0x -- onto whatever it is sent,
# so the nominal has to stay under a third of that ceiling. n-queens declares
# 4000 ms and the corpus goes to 6000; ten times either becomes 114 s or more
# once java's 2.86x lands, and the runner then rejects the job outright as an
# invalid budget rather than judging it, which reads as a system_error on
# every case.
MEASUREMENT_CEILING_MS = max(1, int(os.environ.get(
    "CODERPUZZLE_CALIBRATION_CEILING_MS", str(judge.MAX_PER_CASE_TIMEOUT_MS))))


def _measurement_time_ms(nominal_ms: int) -> int:
    """The per-case ceiling the sweep measures under. Never below nominal."""
    return max(nominal_ms, min(nominal_ms * MEASUREMENT_HEADROOM, MEASUREMENT_CEILING_MS))


class HostUnhealthy(RuntimeError):
    """Raised when consecutive failures indicate the judge host, not the corpus."""


def _read(path: str) -> str | None:
    try:
        return Path(path).read_text(encoding="utf-8").strip()
    except OSError:
        return None


def _cloud_instance() -> dict[str, str]:
    """What the cloud says this machine is, when it is a cloud machine.

    A timing is only meaningful next to the hardware that produced it, and
    "AMD EPYC 9B45, 4 logical CPUs" does not say whether those are 4 shared
    vCPUs on a burstable instance or 4 dedicated ones -- the instance type
    does. Off GCE the metadata server is simply absent and the record omits
    these keys rather than guessing.
    """
    found: dict[str, str] = {}
    for key, path in (("machine_type", "machine-type"), ("zone", "zone"),
                      ("instance_name", "name")):
        request = urllib.request.Request(
            "http://metadata.google.internal/computeMetadata/v1/instance/" + path,
            headers={"Metadata-Flavor": "Google"})
        try:
            with urllib.request.urlopen(request, timeout=2) as response:
                value = response.read().decode("utf-8", "replace").strip()
        except (OSError, ValueError):
            return found
        if value:
            found[key] = value.rsplit("/", 1)[-1]
    return found


def _cpu_topology(cpuinfo: str) -> dict[str, int]:
    """Physical cores behind the logical CPUs, where /proc/cpuinfo says so."""
    cores, current = set(), {}
    for line in cpuinfo.splitlines():
        if ":" not in line:
            if current.get("physical id") is not None and current.get("core id") is not None:
                cores.add((current["physical id"], current["core id"]))
            current = {}
            continue
        key, _, value = line.partition(":")
        current[key.strip()] = value.strip()
    if current.get("physical id") is not None and current.get("core id") is not None:
        cores.add((current["physical id"], current["core id"]))
    return {"physical_cores": len(cores)} if cores else {}


def hardware_snapshot() -> dict[str, object]:
    cpuinfo = _read("/proc/cpuinfo") or ""
    model = next((line.split(":", 1)[1].strip() for line in cpuinfo.splitlines()
                  if line.lower().startswith("model name") or line.lower().startswith("hardware")), "unknown")
    meminfo = _read("/proc/meminfo") or ""
    memory_kib = int(next((m.group(1) for m in (re.match(r"MemTotal:\s+(\d+)", line) for line in meminfo.splitlines()) if m), "0"))
    cgroup = {}
    for name in ("cpuset.cpus.effective", "cpu.max", "memory.max", "memory.swap.max", "pids.max"):
        for root in ("/sys/fs/cgroup", "/sys/fs/cgroup/cpu"):
            value = _read(f"{root}/{name}")
            if value is not None:
                cgroup[name] = value
                break
    snapshot = {"hostname": platform.node(), "platform": platform.platform(),
                "cpu_model": model, "logical_cpus": os.cpu_count(),
                "memory_total_kib": memory_kib, "cgroup": cgroup,
                "container_user": os.getuid(),
                **_cpu_topology(cpuinfo), **_cloud_instance()}
    snapshot["fingerprint"] = hashlib.sha256(
        json.dumps({key: snapshot[key] for key in IDENTITY_KEYS}, sort_keys=True).encode()).hexdigest()
    return snapshot


# What actually makes a timing comparable. `hostname` is deliberately NOT in
# here: inside a container platform.node() is the container id, so it changes
# on every recreate — and a deploy recreates the container. Hashing it made
# the resume check fail after any deploy and silently discard a checkpoint's
# worth of good records (16,931 of them, ~20 h of measurement, after the
# 2026-09-14 run). The hostname stays in the snapshot as a breadcrumb.
IDENTITY_KEYS = ("cgroup", "container_user", "cpu_model", "logical_cpus",
                 "memory_total_kib", "platform")


def same_hardware(stored: dict[str, object] | None, current: dict[str, object]) -> bool:
    """Whether a checkpoint's records were measured on this same hardware.

    Compares the identity fields directly rather than trusting the stored
    fingerprint, so a checkpoint written before the hash changed still
    resumes as long as the hardware really is the same."""
    if not isinstance(stored, dict):
        return False
    if stored.get("fingerprint") == current.get("fingerprint"):
        return True
    return all(stored.get(key) == current.get(key) for key in IDENTITY_KEYS) and all(
        key in stored for key in IDENTITY_KEYS)


def _case_metric_ms(row: dict[str, object], keys: tuple[str, ...]) -> int:
    """One judged case's timing, whether or not the case is visible.

    _run_judge hides a non-public case's measurements behind an underscore so
    they never reach a browser. The sweep runs inside the trust boundary and
    has to count them: reading only the public keys made every record
    describe the statement's examples alone. On two-sum that is 3 of 18
    cases, so the reference measured 643 ms where it really costs 3844 -- and
    a bundle's examples are its smallest inputs, while the cases a capped job
    actually judges are the largest, and hidden.
    """
    for key in keys:
        value = row.get(key)
        if isinstance(value, (int, float)) and value > 0:
            return int(value)
    return 0


def _case_runtime_ms(row: dict[str, object]) -> int:
    """What _summarize would count for this case.

    reference_walltime_ms is the ratio's denominator and _summarize's
    runtime_ms is its numerator, so the two have to be the same quantity.
    They are the same number in the shared profile, where runtime_ms is wall
    time, and they are not in the isolated profile, where it is CPU time --
    which would divide a CPU numerator by a wall denominator.
    """
    # The wall keys are a last resort, not a preference: a judged case always
    # carries runtime_ms, and falling through to 0 would read as a missing
    # timing and fail a pair that actually ran.
    return _case_metric_ms(row, ("runtime_ms", "_runtime_ms", "wall_time_ms", "_wall_time_ms"))


def _case_wall_ms(row: dict[str, object]) -> int:
    """This case on the wall clock.

    The per-case deadline is a wall-clock limit, so the slowest case has to
    be measured on the wall even where runtime_ms reports CPU time.
    """
    return _case_metric_ms(row, ("wall_time_ms", "_wall_time_ms", "runtime_ms", "_runtime_ms"))


def _case_algorithm_us(row: dict[str, object]) -> int:
    """This case's submission-only span, in microseconds.

    Pairs with _summarize's algorithm_us as the ratio's denominator. Zero
    means unmeasured (or genuinely empty); the floor gate decides whether
    a ratio may be formed. Deadlines keep reading the wall helpers above.
    """
    return _case_metric_ms(row, ("algorithm_us", "_algorithm_us"))


def _pair_wait_seconds(case_count: int, per_case_seconds: float) -> float:
    """How long to wait for one measured pair, from its own language's cost."""
    return case_count * per_case_seconds * judge.JOB_HEADROOM + 10


def _seeded_allowances() -> dict[str, float]:
    """Per-language per-case job cost read out of the published calibration.

    A deployment that has measured a language before already knows what a
    case costs it, so a resumed sweep starts from that rather than from the
    shared figure.
    """
    seeded: dict[str, float] = {}
    for (_, language), row in calibration.records().items():
        observed = row.get("observed_job_ms")
        if isinstance(observed, (int, float)) and observed > 0:
            per_case = observed / 1000 / max(1, int(row.get("case_count") or 1))
            seeded[language] = max(seeded.get(language, 0.0), per_case)
    return seeded


def main() -> int:
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
    parser = argparse.ArgumentParser(prog="python -m app.calibrate")
    parser.add_argument("--recalibrate", action="store_true", help="legacy alias for --force")
    parser.add_argument("--force", action="store_true",
                        help="run even when a calibration for this hardware already exists "
                             "(still resumes from the checkpoint)")
    parser.add_argument("--restart", action="store_true",
                        help="discard the checkpoint and measure every combination again")
    args = parser.parse_args()
    # Calibration is the bootstrap operation that creates the prerequisite.
    calibration.REQUIRED = False
    # The wait for one pair is sized from what that language has actually
    # cost, not from one figure for every language: a judged case spends what
    # it spends on starting a process, which is 215 ms in python3 and 44 ms in
    # cpp on the deployment host. Allowances are seeded from the published
    # calibration where it recorded a job and ratchet from this run's own
    # measurements as they land, so the first pair of a language is the only
    # one on the shared starting figure.
    base_timeout = judge.RUNNER_TIMEOUT
    allowances = _seeded_allowances()
    hardware = hardware_snapshot()
    progress = calibration.load() if PROGRESS_FILE == calibration.CALIBRATION_FILE else None
    try:
        progress = json.loads(PROGRESS_FILE.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        progress = None
    completed_keys = set()
    # Resuming is the default, including under --force: re-publishing a
    # calibration is not a reason to throw away hours of valid measurement.
    # Only --restart discards the checkpoint.
    if (
        progress
        and same_hardware(progress.get("hardware"), hardware)
        and progress.get("scored_quantity") == "algorithm"
        and not args.restart
    ):
        completed_keys = {(r["slug"], r["language"]) for r in progress.get("records", [])}
        LOG.info("resuming checkpoint with %d completed records and %d failures to retry",
                 len(completed_keys), len(progress.get("failures", [])))
    elif progress and not args.restart:
        if progress.get("scored_quantity") != "algorithm":
            LOG.warning("checkpoint ignored: it was measured before algorithm timing")
        else:
            LOG.warning("checkpoint ignored: it was measured on different hardware")
    previous = calibration.load()
    if previous and same_hardware(previous.get("hardware"), hardware) and not (args.force or args.recalibrate):
        LOG.info("calibration is current; hardware fingerprint %s unchanged, skipping", hardware["fingerprint"][:12])
        return 0
    LOG.info("starting calibration on %s (%s), %s logical CPUs, %.1f GiB RAM, fingerprint %s",
             hardware["cpu_model"], hardware["platform"], hardware["logical_cpus"],
             int(hardware["memory_total_kib"]) / 1024 / 1024, hardware["fingerprint"][:12])
    rows = list(progress.get("records", [])) if completed_keys else []
    # Deliberately NOT carried over: completed_keys holds only the successes,
    # so every previously failed combination is about to be measured again.
    # Keeping the old entries would publish failures for combinations that
    # have since passed, and double-count the ones that fail twice.
    failures: list[dict[str, object]] = []
    def checkpoint() -> None:
        calibration.CALIBRATION_DIR.mkdir(parents=True, exist_ok=True)
        payload = json.dumps({"schema_version": 1, "hardware": hardware,
            "scored_quantity": "algorithm",
            "records": rows, "failures": failures}, sort_keys=True).encode()
        fd, temp = tempfile.mkstemp(prefix="calibration-progress-", suffix=".json", dir=calibration.CALIBRATION_DIR)
        try:
            with os.fdopen(fd, "wb") as handle:
                handle.write(payload)
                handle.flush()
                os.fsync(handle.fileno())
            os.replace(temp, PROGRESS_FILE)
            directory = os.open(calibration.CALIBRATION_DIR, os.O_RDONLY)
            try:
                os.fsync(directory)
            finally:
                os.close(directory)
        finally:
            Path(temp).unlink(missing_ok=True)
    run_started = time.monotonic()
    # A ratio only means something when its two halves were timed the same
    # way, so the artifact records what this sweep measured under and the
    # judge refuses to divide across a change (docs/api-and-cli.md).
    measured_modes: set[str] = set()
    measured_profiles: set[str] = set()
    problems = list_problems()
    total = len(starter_languages())
    completed = 0
    consecutive = 0

    def note_failure(entry: dict[str, object]) -> None:
        """Record one failure, checkpoint it, and trip the breaker once the
        run stops looking like a corpus problem and starts looking like a
        broken host."""
        nonlocal consecutive
        failures.append(entry)
        checkpoint()
        consecutive += 1
        if consecutive >= CONSECUTIVE_FAILURE_LIMIT:
            raise HostUnhealthy(
                f"{consecutive} consecutive reference failures, ending at "
                f"{entry['slug']}/{entry['language']}. The judge host is unhealthy "
                "(a full runner /tmp does exactly this); fix it and re-run to "
                "resume from the checkpoint."
            )

    try:
        for item in problems:
            slug = item["slug"]
            bundle = safe_problem_path(slug)
            problem = load_problem(slug, path=bundle)
            cases, public_count = load_all_cases(slug, path=bundle)
            for starter in sorted(bundle.glob("starter.*")):
                language = EXTENSION_LANGUAGE.get(starter.suffix[1:])
                if not language:
                    continue
                if (slug, language) in completed_keys:
                    completed += 1
                    continue
                reference = load_designated_reference(slug, language, path=bundle)
                if reference is None:
                    LOG.error("[%d/%d] %s/%s has no reference; continuing", completed, total, slug, language)
                    note_failure({"slug": slug, "language": language, "kind": "missing_reference"})
                    continue
                completed += 1
                LOG.info("[%d/%d] calibrating %s/%s", completed, total, slug, language)
                judge.RUNNER_TIMEOUT = max(base_timeout, _pair_wait_seconds(
                    len(judge.select_cases(cases, public_count)),
                    allowances.get(language, judge.PER_CASE_RUNNER_SECONDS)))
                measured = {**problem, "limits": {
                    **problem["limits"],
                    "time_ms": _measurement_time_ms(int(problem["limits"]["time_ms"]))}}
                pair_started = time.monotonic()
                try:
                    results = _run_judge(measured, language, reference, cases, public_count, bundle,
                                         respect_calibration=False)
                    failed_results = [row for row in results if row.get("status") not in {"accepted", "completed"}]
                    if failed_results:
                        statuses = sorted({row.get("status") for row in failed_results})
                        LOG.error("[%d/%d] %s/%s reference failed (%s); continuing",
                                  completed, total, slug, language, statuses)
                        note_failure({"slug": slug, "language": language, "kind": "reference_verdict",
                                      "statuses": statuses,
                                      "failed_cases": [row.get("index") for row in failed_results]})
                        continue
                except HostUnhealthy:
                    raise
                except Exception as error:  # noqa: BLE001 — preserve the full matrix
                    LOG.exception("[%d/%d] %s/%s calibration error; continuing", completed, total, slug, language)
                    note_failure({"slug": slug, "language": language, "kind": "runner_error",
                                  "error": f"{type(error).__name__}: {error}"})
                    continue
                # The slowest case is what the per-case deadline has to
                # cover; the mean does not predict it (see judge.py).
                wall = sum(_case_runtime_ms(row) for row in results)
                slowest = max((_case_wall_ms(row) for row in results), default=0)
                # What the job cost end to end, which is what a submission's
                # job budget has to cover; the per-case figures above exclude
                # the fixed cost of starting one.
                observed_job_ms = int((time.monotonic() - pair_started) * 1000)
                measured_modes.update(r.get("timing_mode", "wall") for r in results)
                measured_profiles.update(r.get("resource_profile", "shared-wall-v1") for r in results)
                allowances[language] = max(allowances.get(language, 0.0),
                                           observed_job_ms / 1000 / max(1, len(results)))
                if wall <= 0:
                    LOG.error("[%d/%d] %s/%s produced no timing; continuing", completed, total, slug, language)
                    note_failure({"slug": slug, "language": language, "kind": "missing_timing"})
                    continue
                algorithm = sum(_case_algorithm_us(row) for row in results)
                record = {"slug": slug, "language": language,
                          "reference_walltime_ms": wall,
                          "timeout_ms": max(1, wall * 10),
                          "case_count": len(results),
                          "slowest_case_ms": slowest,
                          "observed_job_ms": observed_job_ms}
                if algorithm > 0:
                    record["reference_algorithm_us"] = algorithm
                rows.append(record)
                consecutive = 0
                checkpoint()
                LOG.info("[%d/%d] %s/%s reference wall=%dms timeout=%dms", completed, total, slug, language, wall, wall * 10)
    except HostUnhealthy as error:
        # Deliberately do NOT publish calibration.json: a matrix whose tail
        # is host noise would read as complete and block every combination
        # it touched. The checkpoint holds the good records for a resume.
        LOG.error("calibration aborted after %d records: %s", len(rows), error)
        return 2
    payload = {"schema_version": 1, "created_at": time.time(),
               "platform": platform.platform(), "hardware": hardware, "records": rows,
               "failures": failures,
               "scored_quantity": "algorithm",
               "timing_mode": next(iter(measured_modes)) if len(measured_modes) == 1 else "mixed",
               "resource_profile": (next(iter(measured_profiles))
                                    if len(measured_profiles) == 1 else "mixed"),
               "duration_seconds": time.monotonic() - run_started}
    calibration.CALIBRATION_DIR.mkdir(parents=True, exist_ok=True)
    fd, temp = tempfile.mkstemp(prefix="calibration-", suffix=".json", dir=calibration.CALIBRATION_DIR)
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as handle:
            json.dump(payload, handle, indent=2, sort_keys=True)
            handle.write("\n")
        os.replace(temp, calibration.CALIBRATION_FILE)
    finally:
        Path(temp).unlink(missing_ok=True)
    LOG.info("wrote %s (%d records, %d failures)", calibration.CALIBRATION_FILE, len(rows), len(failures))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
