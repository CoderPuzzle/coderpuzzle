import sqlite3
from pathlib import Path
from typing import Any

from .base import ExecutorError, PreparedProgram
from .python3 import Python3Executor


def _statement_count(code: str) -> int:
    """Complete statements in the submission, quote-aware:
    sqlite3.complete_statement tracks quotes and comments, so a semicolon
    inside a string literal never counts as a terminator (mirrors
    sql_harness._split_statements, not importable here — it pulls in the
    /runner protocol module)."""
    statements = []
    buffer = ""
    for line in code.splitlines(keepends=True):
        buffer += line
        if sqlite3.complete_statement(buffer):
            statements.append(buffer.strip().rstrip(";").strip())
            buffer = ""
    if buffer.strip():
        statements.append(buffer.strip().rstrip(";").strip())
    return len([statement for statement in statements if statement])


class SqlExecutor(Python3Executor):
    """SQLite SELECT-query executor sharing the Python runtime plugin."""

    language = "sql"
    harness_path = Path("/runner/sql_harness.py")

    def prepare(
        self,
        job_root: Path,
        scratch: Path,
        code: str,
        invocation: dict[str, Any],
        limits: dict[str, Any],
        assembly: dict[str, dict[str, str]] | None = None,
    ) -> PreparedProgram:
        invocation_sql = invocation.get("sql") or {}
        if not invocation_sql.get("dynamic_columns") and _statement_count(code) > 1:
            raise ExecutorError("SQL submissions must be a single SELECT statement")
        return super().prepare(job_root, scratch, code, invocation, limits, assembly)

