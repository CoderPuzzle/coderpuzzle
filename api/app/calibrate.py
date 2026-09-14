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
    snapshot["fingerprint"] = hashlib.sha256(json.dumps(snapshot, sort_keys=True).encode()).hexdigest()
    return snapshot


def main() -> int:
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
    parser = argparse.ArgumentParser(prog="python -m app.calibrate")
    parser.add_argument("--recalibrate", action="store_true", help="legacy alias for --force")
    parser.add_argument("--force", action="store_true", help="run even when the hardware fingerprint is unchanged")
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
    if progress and progress.get("hardware", {}).get("fingerprint") == hardware["fingerprint"] and not (args.force or args.recalibrate):
        completed_keys = {(r["slug"], r["language"]) for r in progress.get("records", [])}
        LOG.info("resuming checkpoint with %d completed records and %d failures", len(completed_keys), len(progress.get("failures", [])))
    previous = calibration.load()
    if previous and previous.get("hardware", {}).get("fingerprint") == hardware["fingerprint"] and not (args.force or args.recalibrate):
        LOG.info("calibration is current; hardware fingerprint %s unchanged, skipping", hardware["fingerprint"][:12])
        return 0
    LOG.info("starting calibration on %s (%s), %s logical CPUs, %.1f GiB RAM, fingerprint %s",
             hardware["cpu_model"], hardware["platform"], hardware["logical_cpus"],
             int(hardware["memory_total_kib"]) / 1024 / 1024, hardware["fingerprint"][:12])
    rows = list(progress.get("records", [])) if completed_keys else []
    failures = list(progress.get("failures", [])) if completed_keys else []
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
                failures.append({"slug": slug, "language": language, "kind": "missing_reference"})
                LOG.error("[%d/%d] %s/%s has no reference; continuing", completed, total, slug, language)
                checkpoint()
                continue
            completed += 1
            LOG.info("[%d/%d] calibrating %s/%s", completed, total, slug, language)
            try:
                results = _run_judge(problem, language, reference, cases, public_count, bundle)
                failed_results = [row for row in results if row.get("status") not in {"accepted", "completed"}]
                if failed_results:
                    failures.append({"slug": slug, "language": language, "kind": "reference_verdict",
                                     "statuses": sorted({row.get("status") for row in failed_results}),
                                     "failed_cases": [row.get("index") for row in failed_results]})
                    LOG.error("[%d/%d] %s/%s reference failed (%s); continuing",
                              completed, total, slug, language, failures[-1]["statuses"])
                    checkpoint()
                    continue
            except Exception as error:  # noqa: BLE001 — preserve the full matrix
                failures.append({"slug": slug, "language": language, "kind": "runner_error",
                                 "error": f"{type(error).__name__}: {error}"})
                LOG.exception("[%d/%d] %s/%s calibration error; continuing", completed, total, slug, language)
                checkpoint()
                continue
            wall = sum(int(row.get("wall_time_ms", row.get("runtime_ms", 0))) for row in results)
            if wall <= 0:
                failures.append({"slug": slug, "language": language, "kind": "missing_timing"})
                LOG.error("[%d/%d] %s/%s produced no timing; continuing", completed, total, slug, language)
                checkpoint()
                continue
            rows.append({"slug": slug, "language": language,
                         "reference_walltime_ms": wall,
                         "timeout_ms": max(1, wall * 10),
                         "case_count": len(results)})
            checkpoint()
            LOG.info("[%d/%d] %s/%s reference wall=%dms timeout=%dms", completed, total, slug, language, wall, wall * 10)
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
