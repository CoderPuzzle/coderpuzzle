"""Deployment-local reference timing calibration records."""
from __future__ import annotations

import json
import os
from pathlib import Path
from typing import Any


CALIBRATION_DIR = Path(os.environ.get("CODERPUZZLE_CALIBRATION_DIR", ".calibration"))
CALIBRATION_FILE = CALIBRATION_DIR / "calibration.json"
REQUIRED = os.environ.get("CODERPUZZLE_REQUIRE_CALIBRATION", "0") == "1"


def load() -> dict[str, Any] | None:
    try:
        value = json.loads(CALIBRATION_FILE.read_text(encoding="utf-8"))
    except (FileNotFoundError, OSError, json.JSONDecodeError):
        return None
    return value if isinstance(value, dict) else None


def records() -> dict[tuple[str, str], dict[str, Any]]:
    value = load() or {}
    result = {}
    for row in value.get("records", []):
        if isinstance(row, dict) and row.get("slug") and row.get("language"):
            result[(row["slug"], row["language"])] = row
    return result


def prerequisite() -> tuple[bool, str]:
    value = load()
    if value is None:
        return False, f"Calibration is required; missing {CALIBRATION_FILE}"
    if value.get("schema_version") != 1:
        return False, "Calibration record has an unsupported schema"
    rows = records()
    if not rows:
        return False, "Calibration record is empty"
    try:
        from .problems import list_problems, safe_problem_path
        languages = {"py":"python3", "js":"javascript", "ts":"typescript", "java":"java",
                     "cpp":"cpp", "go":"go", "rs":"rust", "sql":"sql", "sh":"shell"}
        expected = {(item["slug"], languages[starter.suffix[1:]])
                    for item in list_problems()
                    for starter in safe_problem_path(item["slug"]).glob("starter.*")
                    if starter.suffix[1:] in languages}
        missing = expected - set(rows)
        if missing:
            return False, f"Calibration is incomplete; missing {len(missing)} problem/language records"
    except (OSError, ValueError, KeyError):
        return False, "Problem bank is unavailable for calibration validation"
    if any(not isinstance(row.get("reference_walltime_ms"), (int, float)) or row["reference_walltime_ms"] <= 0
           or not isinstance(row.get("timeout_ms"), int) or row["timeout_ms"] <= 0 for row in rows.values()):
        return False, "Calibration record contains an invalid timing"
    return True, "ok"


def lookup(slug: str, language: str) -> dict[str, Any] | None:
    return records().get((slug, language))


def enforce() -> None:
    if REQUIRED:
        ok, detail = prerequisite()
        if not ok:
            from fastapi import HTTPException
            raise HTTPException(status_code=503, detail=detail)
