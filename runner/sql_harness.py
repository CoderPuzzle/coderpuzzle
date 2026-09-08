import json
import sqlite3
import sys
from pathlib import Path

sys.path.insert(0, "/runner")

from protocol import emit_protocol

PROTOCOL_PREFIX = "__CODERPUZZLE_RESULT__"
MAX_CAPTURED_OUTPUT = 16_384
# A bare word: the pinned SQL formatter (sqlparse) rewrites `%`-wrapped
# markers (`%COLUMNS%` becomes `% COLUMNS %`), but leaves name tokens
# byte-exact, so submissions survive the in-image format pass.
DEFAULT_COLUMN_PLACEHOLDER = "__COLUMNS__"


def _json_safe_rows(rows) -> list:
    safe = []
    for row in rows:
        values = []
        for value in row:
            if isinstance(value, bytes):
                raise ValueError("BLOB columns are not supported")
            if isinstance(value, float) and value != value:
                raise ValueError("NaN is not a valid SQL result value")
            values.append(value)
        safe.append(values)
    return safe


def _split_statements(query: str) -> list[str]:
    """Split the submission into complete statements.

    `sqlite3.complete_statement` tracks quotes and comments, so a semicolon
    inside a string literal never ends a statement prematurely (the executor's
    guard keeps plain submissions to a single statement anyway; this splitter
    only runs for dynamic_columns problems, where setup statements are the
    point).
    """
    statements = []
    buffer = ""
    for line in query.splitlines(keepends=True):
        buffer += line
        if sqlite3.complete_statement(buffer):
            statements.append(buffer.strip().rstrip(";").strip())
            buffer = ""
    if buffer.strip():
        statements.append(buffer.strip().rstrip(";").strip())
    return [statement for statement in statements if statement]


def _deny_attachment(action, argument1, argument2, database, trigger):
    """Authorizer for dynamic_columns submissions: arbitrary statements may
    build temp tables, but a submission must never reach outside its own
    in-memory database."""
    if action in (sqlite3.SQLITE_ATTACH, sqlite3.SQLITE_DETACH):
        return sqlite3.SQLITE_DENY
    return sqlite3.SQLITE_OK


def _run_query(connection, statement: str, want_headers: bool):
    cursor = connection.execute(f"SELECT * FROM ({statement})")
    rows = _json_safe_rows(cursor.fetchall())
    if want_headers:
        columns = [description[0] for description in cursor.description or []]
        return {"columns": columns, "rows": rows}
    return rows


def _run_dynamic_columns(connection, statements: list[str], flags: dict):
    """Statement 1 discovers a column list from the data; its output is
    substituted (raw — the discovery statement does its own quoting, e.g. via
    quote()) into every __COLUMNS__ occurrence of the remaining statements.
    Statements 2..n-1 are setup; the last is the answer SELECT."""
    separator = flags.get("separator", ",")
    placeholder = flags.get("placeholder", DEFAULT_COLUMN_PLACEHOLDER)
    if not isinstance(separator, str) or not separator:
        raise ValueError("dynamic_columns separator must be a non-empty string")
    if not isinstance(placeholder, str) or not placeholder:
        raise ValueError("dynamic_columns placeholder must be a non-empty string")
    if len(statements) < 2:
        raise ValueError(
            "dynamic_columns requires a discovery SELECT followed by the answer statement"
        )
    discovery = connection.execute(statements[0]).fetchall()
    if len(discovery) != 1 or len(discovery[0]) != 1:
        raise ValueError("discovery SELECT must return exactly one row and one column")
    raw = discovery[0][0]
    if not isinstance(raw, str):
        raise ValueError("discovery SELECT must return a text column list")
    columns = separator.join(piece.strip() for piece in raw.split(separator))
    prepared = [statement.replace(placeholder, columns) for statement in statements[1:]]
    for setup in prepared[:-1]:
        connection.execute(setup)
    return prepared[-1]


def main() -> None:
    response: dict
    try:
        payload = json.load(sys.stdin)
        invocation = payload["invocation"]
        case_setup = payload["input"][0] if payload.get("input") else ""
        sql_flags = invocation.get("sql") or {}
        schema = sql_flags.get("schema", "")
        connection = sqlite3.connect(":memory:")
        if sql_flags.get("dynamic_columns"):
            connection.set_authorizer(_deny_attachment)
        if schema.strip():
            connection.executescript(schema)
        if case_setup.strip():
            connection.executescript(case_setup)
        argv = sys.argv[1:]
        if "--" in argv:
            argv = argv[argv.index("--") + 1 :]
        query = Path(argv[0]).read_text(encoding="utf-8")
        if sql_flags.get("dynamic_columns"):
            answer = _run_dynamic_columns(connection, _split_statements(query), sql_flags)
        else:
            # The submission is a single SELECT whose row set is the answer.
            answer = query
        actual = _run_query(connection, answer, bool(sql_flags.get("headers")))
        response = {"status": "completed", "actual": actual, "stdout": ""}
    except sqlite3.Error as error:
        response = {
            "status": "runtime_error",
            "error": f"SQL error: {error}"[:1000],
            "stdout": "",
        }
    except BaseException as error:
        if isinstance(error, (KeyboardInterrupt, SystemExit)):
            error = RuntimeError("Solution interrupted execution")
        response = {
            "status": "runtime_error",
            "error": f"{type(error).__name__}: {error}"[:1000],
            "stdout": "",
        }
    emit_protocol(PROTOCOL_PREFIX + json.dumps(response, allow_nan=False, separators=(",", ":")))


if __name__ == "__main__":
    main()
