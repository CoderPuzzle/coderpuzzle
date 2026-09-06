import hashlib
import hmac
import json
import os
import sqlite3
import time
import uuid
from contextlib import contextmanager
from pathlib import Path
from typing import Any, Iterator


DATA_DIR = Path(os.environ.get("OPENOJ_DATA_DIR", ".data"))
DATABASE_PATH = DATA_DIR / "openoj.sqlite3"

# Guest sessions expire after this much inactivity (seconds); everything the
# session owns — drafts and submissions — is deleted with it.
SESSION_IDLE_SECONDS = 3600


def initialize_database() -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    with connect() as connection:
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS submissions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                session_id TEXT,
                problem_slug TEXT NOT NULL,
                language TEXT NOT NULL,
                code TEXT NOT NULL,
                status TEXT NOT NULL,
                passed INTEGER NOT NULL,
                total INTEGER NOT NULL,
                runtime_ms INTEGER NOT NULL,
                results_json TEXT NOT NULL,
                created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
            )
            """
        )
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS sessions (
                id TEXT PRIMARY KEY,
                created_at REAL NOT NULL,
                last_seen_at REAL NOT NULL
            )
            """
        )
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL UNIQUE,
                password_hash TEXT NOT NULL,
                is_admin INTEGER NOT NULL DEFAULT 0,
                created_at REAL NOT NULL
            )
            """
        )
        # Sessions created before user management have no user binding.
        session_columns = {row["name"] for row in connection.execute("PRAGMA table_info(sessions)")}
        if "user_id" not in session_columns:
            connection.execute("ALTER TABLE sessions ADD COLUMN user_id INTEGER")
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS drafts (
                session_id TEXT NOT NULL,
                problem_slug TEXT NOT NULL,
                language TEXT NOT NULL,
                code TEXT NOT NULL,
                updated_at REAL NOT NULL,
                PRIMARY KEY (session_id, problem_slug, language)
            )
            """
        )
        # Databases created before guest sessions have no session_id column.
        columns = {row["name"] for row in connection.execute("PRAGMA table_info(submissions)")}
        if "session_id" not in columns:
            connection.execute("ALTER TABLE submissions ADD COLUMN session_id TEXT")
        # Submissions recorded before time-cost scoring carry no reference runtime.
        if "reference_runtime_ms" not in columns:
            connection.execute("ALTER TABLE submissions ADD COLUMN reference_runtime_ms INTEGER")
        # Every scoped read (per-viewer submissions, progress, purge) filters
        # on the storage scope; results_json rows are fat, so keep those
        # scans off the hot paths. Idempotent: IF NOT EXISTS matches the
        # PRAGMA-migration style above.
        connection.execute(
            "CREATE INDEX IF NOT EXISTS idx_submissions_scope ON submissions(session_id, problem_slug)"
        )
        connection.execute(
            "CREATE INDEX IF NOT EXISTS idx_sessions_last_seen ON sessions(last_seen_at)"
        )


@contextmanager
def connect() -> Iterator[sqlite3.Connection]:
    connection = sqlite3.connect(DATABASE_PATH, timeout=5)
    connection.row_factory = sqlite3.Row
    connection.execute("PRAGMA journal_mode=WAL")
    connection.execute("PRAGMA synchronous=NORMAL")
    try:
        yield connection
        connection.commit()
    finally:
        connection.close()


def save_submission(
    slug: str,
    language: str,
    code: str,
    status: str,
    passed: int,
    total: int,
    runtime_ms: int,
    results: list[dict[str, Any]],
    session_id: str | None = None,
    reference_runtime_ms: int | None = None,
) -> int:
    with connect() as connection:
        cursor = connection.execute(
            """
            INSERT INTO submissions
                (session_id, problem_slug, language, code, status, passed, total, runtime_ms, results_json, reference_runtime_ms)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                session_id,
                slug,
                language,
                code,
                status,
                passed,
                total,
                runtime_ms,
                json.dumps(results),
                reference_runtime_ms,
            ),
        )
        return int(cursor.lastrowid)


def list_submissions(
    slug: str, limit: int = 50, session_id: str | None = None
) -> list[dict[str, Any]]:
    with connect() as connection:
        rows = connection.execute(
            """
            SELECT id, problem_slug, language, status, passed, total, runtime_ms, reference_runtime_ms, created_at
            FROM submissions
            WHERE problem_slug = ? AND session_id = ?
            ORDER BY id DESC LIMIT ?
            """,
            (slug, session_id, limit),
        ).fetchall()
    return [dict(row) for row in rows]


def list_progress(scope: str) -> dict[str, str]:
    """Per-problem solving state for one storage scope: 'solved' when any
    submission in any language was accepted, else 'attempted'. Problems with
    no submissions are absent from the map — readers treat absence as
    never-tried."""
    with connect() as connection:
        rows = connection.execute(
            """
            SELECT problem_slug, MAX(status = 'accepted') AS solved
            FROM submissions
            WHERE session_id = ?
            GROUP BY problem_slug
            """,
            (scope,),
        ).fetchall()
    return {row["problem_slug"]: ("solved" if row["solved"] else "attempted") for row in rows}


def get_submission(submission_id: int, session_id: str | None = None) -> dict[str, Any] | None:
    with connect() as connection:
        row = connection.execute(
            "SELECT * FROM submissions WHERE id = ? AND session_id = ?",
            (submission_id, session_id),
        ).fetchone()
    if row is None:
        return None
    result = dict(row)
    result["results"] = json.loads(result.pop("results_json"))
    return result


# --- guest sessions -----------------------------------------------------------


def _purge_session(connection: sqlite3.Connection, session_id: str) -> None:
    connection.execute("DELETE FROM drafts WHERE session_id = ?", (session_id,))
    connection.execute("DELETE FROM submissions WHERE session_id = ?", (session_id,))
    connection.execute("DELETE FROM sessions WHERE id = ?", (session_id,))


def purge_expired_sessions() -> int:
    """Delete every idle-expired session and everything it owns. Returns the
    number of sessions purged."""
    cutoff = time.time() - SESSION_IDLE_SECONDS
    with connect() as connection:
        expired = [
            row["id"]
            for row in connection.execute("SELECT id FROM sessions WHERE last_seen_at < ?", (cutoff,))
        ]
        for session_id in expired:
            _purge_session(connection, session_id)
    return len(expired)


def create_session() -> str:
    session_id = uuid.uuid4().hex
    now = time.time()
    with connect() as connection:
        connection.execute(
            "INSERT INTO sessions (id, created_at, last_seen_at) VALUES (?, ?, ?)",
            (session_id, now, now),
        )
    return session_id


def validate_session(session_id: str, touch: bool = True) -> str | None:
    """Return the session id if it exists and is not idle-expired (touching
    its last-seen clock at most once a minute, so reads do not write on every
    request); otherwise None. Expired sessions are purged. touch=False checks
    without extending the clock — the idle watcher probes with it so its
    polling can never keep an abandoned session alive."""
    now = time.time()
    cutoff = now - SESSION_IDLE_SECONDS
    with connect() as connection:
        row = connection.execute(
            "SELECT last_seen_at FROM sessions WHERE id = ?", (session_id,)
        ).fetchone()
        if row is None:
            return None
        if row["last_seen_at"] < cutoff:
            _purge_session(connection, session_id)
            return None
        if touch and now - row["last_seen_at"] > 60:
            connection.execute("UPDATE sessions SET last_seen_at = ? WHERE id = ?", (now, session_id))
    return session_id


# --- user accounts (backend-only; no UI yet) ----------------------------------
#
# Password hashing with the stdlib: scrypt with per-user salt.
# Format: scrypt$N$r$p$salt-hex$hash-hex

_SCRYPT_N, _SCRYPT_R, _SCRYPT_P = 16384, 8, 1


def _hash_password(password: str, salt: bytes | None = None) -> str:
    if salt is None:
        salt = os.urandom(16)
    digest = hashlib.scrypt(
        password.encode("utf-8"), salt=salt, n=_SCRYPT_N, r=_SCRYPT_R, p=_SCRYPT_P, dklen=32
    )
    return f"scrypt${_SCRYPT_N}${_SCRYPT_R}${_SCRYPT_P}${salt.hex()}${digest.hex()}"


def _verify_password(password: str, stored: str) -> bool:
    try:
        scheme, n, r, p, salt_hex, hash_hex = stored.split("$")
        if scheme != "scrypt":
            return False
        digest = hashlib.scrypt(
            password.encode("utf-8"),
            salt=bytes.fromhex(salt_hex),
            n=int(n), r=int(r), p=int(p), dklen=len(hash_hex) // 2,
        )
        return hmac.compare_digest(digest.hex(), hash_hex)
    except (ValueError, TypeError):
        return False


def count_users() -> int:
    with connect() as connection:
        row = connection.execute("SELECT COUNT(*) AS total FROM users").fetchone()
    return int(row["total"])


def create_user(username: str, password: str, is_admin: bool = False) -> int:
    with connect() as connection:
        cursor = connection.execute(
            "INSERT INTO users (username, password_hash, is_admin, created_at) VALUES (?, ?, ?, ?)",
            (username, _hash_password(password), int(is_admin), time.time()),
        )
        return int(cursor.lastrowid)


def verify_user(username: str, password: str) -> dict[str, Any] | None:
    with connect() as connection:
        row = connection.execute(
            "SELECT id, username, password_hash, is_admin FROM users WHERE username = ?",
            (username,),
        ).fetchone()
    if row is None or not _verify_password(password, row["password_hash"]):
        return None
    return {"id": row["id"], "username": row["username"], "is_admin": bool(row["is_admin"])}


def bind_session_user(session_id: str, user_id: int | None) -> None:
    with connect() as connection:
        connection.execute("UPDATE sessions SET user_id = ? WHERE id = ?", (user_id, session_id))


def session_user(session_id: str) -> dict[str, Any] | None:
    with connect() as connection:
        row = connection.execute(
            """
            SELECT users.id, users.username, users.is_admin
            FROM sessions JOIN users ON users.id = sessions.user_id
            WHERE sessions.id = ?
            """,
            (session_id,),
        ).fetchone()
    return None if row is None else {"id": row["id"], "username": row["username"], "is_admin": bool(row["is_admin"])}


def scope_key(session_id: str) -> str:
    """The storage key a session's drafts and submissions live under. A
    logged-in session shares its user's scope (survives idle expiry and
    restores on any later login); a guest session owns an ephemeral one."""
    user = session_user(session_id)
    return f"user:{user['id']}" if user else session_id


# --- session drafts -----------------------------------------------------------


def save_draft(session_id: str, slug: str, language: str, code: str) -> None:
    with connect() as connection:
        connection.execute(
            """
            INSERT INTO drafts (session_id, problem_slug, language, code, updated_at)
            VALUES (?, ?, ?, ?, ?)
            ON CONFLICT(session_id, problem_slug, language)
            DO UPDATE SET code = excluded.code, updated_at = excluded.updated_at
            """,
            (session_id, slug, language, code, time.time()),
        )


def list_drafts(session_id: str, slug: str) -> list[dict[str, Any]]:
    with connect() as connection:
        rows = connection.execute(
            """
            SELECT language, code, updated_at FROM drafts
            WHERE session_id = ? AND problem_slug = ?
            ORDER BY updated_at DESC
            """,
            (session_id, slug),
        ).fetchall()
    return [dict(row) for row in rows]

