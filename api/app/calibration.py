"""Deployment-local reference timing calibration records."""
from __future__ import annotations

import json
import os
from pathlib import Path
from typing import Any


CALIBRATION_DIR = Path(os.environ.get("CODERPUZZLE_CALIBRATION_DIR", ".calibration"))
CALIBRATION_FILE = CALIBRATION_DIR / "calibration.json"
REQUIRED = os.environ.get("CODERPUZZLE_REQUIRE_CALIBRATION", "0") == "1"


# The published file is tens of megabytes on a full problem set and every
# judged pair looks a record up in it, so parsing it per call would put a
# whole-file parse on the judging path. Both caches are keyed on the file's
# identity, so a republished calibration is picked up on its next read.
_loaded: tuple[tuple[str, int, int], dict[str, Any] | None] | None = None
_indexed: tuple[tuple[str, int, int], dict[tuple[str, str], dict[str, Any]]] | None = None


def _identity() -> tuple[str, int, int] | None:
    try:
        stat = CALIBRATION_FILE.stat()
    except OSError:
        return None
    return str(CALIBRATION_FILE), stat.st_mtime_ns, stat.st_size


def load() -> dict[str, Any] | None:
    global _loaded
    identity = _identity()
    if identity is None:
        return None
    if _loaded is not None and _loaded[0] == identity:
        return _loaded[1]
    try:
        value = json.loads(CALIBRATION_FILE.read_text(encoding="utf-8"))
    except (FileNotFoundError, OSError, json.JSONDecodeError):
        return None
    value = value if isinstance(value, dict) else None
    _loaded = (identity, value)
    return value


def records() -> dict[tuple[str, str], dict[str, Any]]:
    """Every record, indexed by (slug, language). Shared and read-only:
    callers get the cached rows themselves, not copies of them."""
    global _indexed
    identity = _identity()
    if identity is not None and _indexed is not None and _indexed[0] == identity:
        return _indexed[1]
    value = load() or {}
    result = {}
    for row in value.get("records", []):
        if isinstance(row, dict) and row.get("slug") and row.get("language"):
            result[(row["slug"], row["language"])] = row
    if identity is not None:
        _indexed = (identity, result)
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
        from .problems import starter_languages
        missing = starter_languages() - set(rows)
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
