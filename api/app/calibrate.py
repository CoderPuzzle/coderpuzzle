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
from pathlib import Path

from . import calibration
from .main import _run_judge
from . import judge
from .problems import list_problems, load_all_cases, load_designated_reference, load_problem, safe_problem_path


LOG = logging.getLogger("coderpuzzle.calibrate")
PROGRESS_FILE = calibration.CALIBRATION_DIR / "calibration-progress.json"

# A reference that fails is news about one bundle; a long unbroken run of
# them is news about the host. The 2026-09-14 sweep filled the runner's
# /tmp and then recorded 8,551 "reference failures" across the remaining
# ~1,180 problems in every language — a poisoned matrix that looked
# complete. Stop instead: the checkpoint survives, so a fixed host resumes
# exactly where the breaker tripped.
CONSECUTIVE_FAILURE_LIMIT = int(os.environ.get("CODERPUZZLE_CALIBRATION_FAILURE_LIMIT", "40"))


class HostUnhealthy(RuntimeError):
    """Raised when consecutive failures indicate the judge host, not the corpus."""
LANGUAGES = {"py":"python3", "js":"javascript", "ts":"typescript", "java":"java",
             "cpp":"cpp", "go":"go", "rs":"rust", "sql":"sql", "sh":"shell"}


def _read(path: str) -> str | None:
    try:
        return Path(path).read_text(encoding="utf-8").strip()
    except OSError:
        return None


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
                "container_user": os.getuid()}
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
    judge.RUNNER_TIMEOUT = max(judge.RUNNER_TIMEOUT, 900)
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
    if progress and same_hardware(progress.get("hardware"), hardware) and not args.restart:
        completed_keys = {(r["slug"], r["language"]) for r in progress.get("records", [])}
        LOG.info("resuming checkpoint with %d completed records and %d failures to retry",
                 len(completed_keys), len(progress.get("failures", [])))
    elif progress and not args.restart:
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
    started = time.time()
    problems = list_problems()
    total = sum(1 for item in problems for starter in safe_problem_path(item["slug"]).glob("starter.*") if starter.suffix[1:] in LANGUAGES)
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
                language = LANGUAGES.get(starter.suffix[1:])
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
                try:
                    results = _run_judge(problem, language, reference, cases, public_count, bundle,
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
                timings = [int(row.get("wall_time_ms", row.get("runtime_ms", 0))) for row in results]
                wall = sum(timings)
                if wall <= 0:
                    LOG.error("[%d/%d] %s/%s produced no timing; continuing", completed, total, slug, language)
                    note_failure({"slug": slug, "language": language, "kind": "missing_timing"})
                    continue
                rows.append({"slug": slug, "language": language,
                             "reference_walltime_ms": wall,
                             "timeout_ms": max(1, wall * 10),
                             "case_count": len(results),
                             "slowest_case_ms": max(timings, default=0)})
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
               "duration_seconds": time.time() - started}
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
