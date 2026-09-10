"""Provider-agnostic auth orchestration.

HTTP handlers call these functions; they never name password / Google / OTP.
"""

from __future__ import annotations

import os
import sqlite3
import time
from typing import Any

from .. import database
from .errors import AuthError
from .registry import all_providers, get, load_defaults
from .types import AuthContext, Identity, StartResult

_LOGIN_WINDOW_SECONDS = 60.0
_LOGIN_MAX_FAILURES = 10
_login_failures: dict[str, list[float]] = {}


def registration_open() -> bool:
    value = os.environ.get("CODERPUZZLE_AUTH_REGISTRATION", "closed").strip().lower()
    return value in {"open", "1", "true", "yes", "on"}


def catalog() -> dict[str, Any]:
    load_defaults()
    try:
        needs_setup = database.count_users() == 0
    except Exception:  # noqa: BLE001 — missing tables = fresh install
        needs_setup = True
    open_reg = needs_setup or registration_open()
    providers = []
    for provider in all_providers():
        if not provider.enabled():
            continue
        descriptor = provider.descriptor(needs_setup=needs_setup)
        can_register = descriptor.can_register and open_reg
        can_login = descriptor.can_login and not needs_setup
        providers.append(
            {
                **descriptor.as_dict(),
                "can_register": can_register,
                "can_login": can_login,
            }
        )
    return {"needs_setup": needs_setup, "providers": providers}


def _provider(provider_id: str):
    load_defaults()
    provider = get(provider_id)
    if provider is None or not provider.enabled():
        raise AuthError(400, "Unknown or disabled sign-in method")
    return provider


def _context(provider_id: str, payload: dict[str, Any], session_id: str | None, request: Any) -> AuthContext:
    try:
        needs_setup = database.count_users() == 0
    except Exception:  # noqa: BLE001
        needs_setup = True
    return AuthContext(
        provider=provider_id,
        payload=payload or {},
        session_id=session_id,
        request=request,
        needs_setup=needs_setup,
    )


def _prune_login_failures(now: float) -> None:
    for source in [
        key
        for key, stamps in _login_failures.items()
        if not stamps or now - stamps[-1] >= _LOGIN_WINDOW_SECONDS
    ]:
        del _login_failures[source]


def login_throttled(source: str) -> bool:
    """True when the source already burned its failure budget (checked
    BEFORE provider work, so throttled callers do no scrypt / token exchange)."""
    now = time.monotonic()
    _prune_login_failures(now)
    recent = [stamp for stamp in _login_failures.get(source, []) if now - stamp < _LOGIN_WINDOW_SECONDS]
    _login_failures[source] = recent
    return len(recent) >= _LOGIN_MAX_FAILURES


def register_login_failure(source: str) -> None:
    now = time.monotonic()
    recent = [stamp for stamp in _login_failures.get(source, []) if now - stamp < _LOGIN_WINDOW_SECONDS]
    recent.append(now)
    _login_failures[source] = recent


def start_auth(provider_id: str, payload: dict[str, Any], session_id: str | None, request: Any) -> dict[str, Any]:
    provider = _provider(provider_id)
    result: StartResult = provider.start(_context(provider_id, payload, session_id, request))
    return result.as_dict()


def _provision(identity: Identity, *, is_admin: bool) -> dict[str, Any]:
    if database.get_identity(identity.provider, identity.subject) is not None:
        raise AuthError(400, "That account is not available")
    try:
        username = database.allocate_username(identity.username)
        user_id = database.create_user(username, is_admin=is_admin)
        database.add_identity(
            user_id,
            identity.provider,
            identity.subject,
            secret=identity.secret,
            extra=identity.extra,
        )
    except sqlite3.IntegrityError as error:
        raise AuthError(400, "That account is not available") from error
    return {"id": user_id, "username": username, "is_admin": is_admin}


def _user_payload(user: dict[str, Any], status: str) -> dict[str, Any]:
    return {"status": status, "username": user["username"], "is_admin": bool(user["is_admin"])}


def complete_auth(
    provider_id: str,
    payload: dict[str, Any],
    session_id: str,
    request: Any,
    source: str,
) -> dict[str, Any]:
    if login_throttled(source):
        raise AuthError(429, "Too many failed attempts; wait a minute")
    provider = _provider(provider_id)
    ctx = _context(provider_id, payload, session_id, request)
    try:
        identity = provider.authenticate(ctx)
    except AuthError as error:
        if error.status_code in {401, 400}:
            register_login_failure(source)
        raise
    user = database.find_user_for_identity(identity.provider, identity.subject)
    if user is None:
        if ctx.needs_setup and provider.descriptor(needs_setup=True).can_bootstrap:
            user = _provision(identity, is_admin=True)
        elif registration_open() and provider.auto_provision:
            user = _provision(identity, is_admin=False)
        else:
            register_login_failure(source)
            raise AuthError(401, "No account for this identity")
    database.bind_session_user(session_id, user["id"])
    return _user_payload(user, "logged_in")


def register_auth(
    provider_id: str,
    payload: dict[str, Any],
    session_id: str | None,
    request: Any,
) -> tuple[dict[str, Any], str]:
    """Returns (payload, session_id). Creates a session when the caller had none."""
    provider = _provider(provider_id)
    ctx = _context(provider_id, payload, session_id, request)
    open_reg = ctx.needs_setup or registration_open()
    if not open_reg:
        raise AuthError(403, "Registration is closed")
    descriptor = provider.descriptor(needs_setup=ctx.needs_setup)
    if ctx.needs_setup and not descriptor.can_bootstrap:
        raise AuthError(400, "This method cannot create the first account")
    if not descriptor.can_register:
        raise AuthError(403, "Registration is not supported by this method")
    identity = provider.register(ctx)
    user = _provision(identity, is_admin=ctx.needs_setup)
    if session_id is None or database.validate_session(session_id, touch=False) is None:
        session_id = database.create_session()
    database.bind_session_user(session_id, user["id"])
    return _user_payload(user, "registered"), session_id
