"""Create deployment-local reference timing calibration records.

Run from the API image after the problems cache and runner are available:
``python -m app.calibrate``.  Use ``--recalibrate`` to replace an existing
record atomically.
"""
from __future__ import annotations

import argparse
import json
import os
import platform
import tempfile
import time
from pathlib import Path

from . import calibration
from .main import _run_judge
from . import judge
from .problems import list_problems, load_all_cases, load_designated_reference, load_problem, safe_problem_path


def main() -> int:
    parser = argparse.ArgumentParser(prog="python -m app.calibrate")
    parser.add_argument("--recalibrate", action="store_true")
    args = parser.parse_args()
    # Calibration is the bootstrap operation that creates the prerequisite.
    calibration.REQUIRED = False
    judge.RUNNER_TIMEOUT = max(judge.RUNNER_TIMEOUT, 900)
    if calibration.CALIBRATION_FILE.exists() and not args.recalibrate:
        parser.error("calibration already exists; pass --recalibrate")
    rows = []
    started = time.time()
    for item in list_problems():
        slug = item["slug"]
        bundle = safe_problem_path(slug)
        problem = load_problem(slug, path=bundle)
        cases, public_count = load_all_cases(slug, path=bundle)
        for starter in sorted(bundle.glob("starter.*")):
            language = {"py":"python3", "js":"javascript", "ts":"typescript", "java":"java",
                        "cpp":"cpp", "go":"go", "rs":"rust", "sql":"sql", "sh":"shell"}.get(starter.suffix[1:])
            if not language:
                continue
            reference = load_designated_reference(slug, language, path=bundle)
            if reference is None:
                raise SystemExit(f"missing reference for {slug}/{language}")
            results = _run_judge(problem, language, reference, cases, public_count, bundle)
            if any(row.get("status") not in {"accepted", "completed"} for row in results):
                raise SystemExit(f"reference failed for {slug}/{language}")
            wall = sum(int(row.get("wall_time_ms", row.get("runtime_ms", 0))) for row in results)
            if wall <= 0:
                raise SystemExit(f"reference produced no timing for {slug}/{language}")
            rows.append({"slug": slug, "language": language,
                         "reference_walltime_ms": wall,
                         "timeout_ms": max(1, wall * 10),
                         "case_count": len(results)})
            print(f"{slug}/{language}: {wall} ms, timeout {wall * 10} ms", flush=True)
    payload = {"schema_version": 1, "created_at": time.time(),
               "platform": platform.platform(), "records": rows,
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
    print(f"wrote {calibration.CALIBRATION_FILE} ({len(rows)} records)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
