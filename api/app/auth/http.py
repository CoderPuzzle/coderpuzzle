"""Auth HTTP surface — provider-agnostic.

Canonical:
  GET  /auth/status
  POST /auth/start
  POST /auth/complete
  POST /auth/register
  GET  /auth/callback/{provider}
  POST /auth/logout

Compatibility aliases (password provider, no ``provider`` field):
  POST /auth/login     → complete
  POST /auth/register  without provider → password
"""

from __future__ import annotations

from typing import Annotated, Any

from fastapi import APIRouter, Cookie, Depends, HTTPException, Request, Response
from fastapi.responses import RedirectResponse

from ..database import bind_session_user, create_session, validate_session
from ..web_session import SESSION_COOKIE, current_session, optional_session, set_session_cookie
from .errors import AuthError
from .service import catalog, complete_auth, register_auth, start_auth

router = APIRouter()


def _raise(error: AuthError) -> None:
    raise HTTPException(status_code=error.status_code, detail=error.detail) from error


def _provider_and_payload(body: dict[str, Any] | None, *, default_provider: str | None = None) -> tuple[str, dict[str, Any]]:
    if not isinstance(body, dict):
        raise HTTPException(status_code=400, detail="Expected a JSON object")
    provider = str(body.get("provider") or default_provider or "").strip()
    if not provider:
        raise HTTPException(status_code=400, detail="provider is required")
    payload = {key: value for key, value in body.items() if key != "provider"}
    return provider, payload


def _source(request: Request) -> str:
    return request.client.host if request.client else "unknown"


@router.get("/auth/status")
def auth_status() -> dict[str, Any]:
    """Public: bootstrap flag plus the catalog of enabled providers.
    Tables may be missing if the data volume was wiped mid-run; treat
    that as a fresh install."""
    return catalog()


@router.post("/auth/start")
def auth_start(
    body: dict[str, Any],
    request: Request,
    session_id: Annotated[str | None, Depends(optional_session)] = None,
) -> dict[str, Any]:
    provider, payload = _provider_and_payload(body)
    try:
        return start_auth(provider, payload, session_id, request)
    except AuthError as error:
        _raise(error)
        raise  # noqa: KEEP — type checkers


@router.post("/auth/complete")
def auth_complete(
    body: dict[str, Any],
    request: Request,
    session_id: Annotated[str, Depends(current_session)],
) -> dict[str, Any]:
    provider, payload = _provider_and_payload(body)
    try:
        return complete_auth(provider, payload, session_id, request, _source(request))
    except AuthError as error:
        _raise(error)
        raise


@router.post("/auth/register")
def auth_register(
    body: dict[str, Any],
    response: Response,
    request: Request,
    session_id: Annotated[str | None, Depends(optional_session)] = None,
) -> dict[str, Any]:
    provider, payload = _provider_and_payload(body, default_provider="password")
    try:
        result, bound = register_auth(provider, payload, session_id, request)
    except AuthError as error:
        _raise(error)
        raise
    set_session_cookie(response, bound, request)
    return result


@router.post("/auth/login")
def auth_login_compat(
    body: dict[str, Any],
    request: Request,
    session_id: Annotated[str, Depends(current_session)],
) -> dict[str, Any]:
    """Compatibility alias: password complete, or any provider if named."""
    provider, payload = _provider_and_payload(body, default_provider="password")
    try:
        return complete_auth(provider, payload, session_id, request, _source(request))
    except AuthError as error:
        _raise(error)
        raise


@router.post("/auth/logout")
def auth_logout(session_id: Annotated[str, Depends(current_session)]) -> dict[str, Any]:
    bind_session_user(session_id, None)
    return {"status": "logged_out"}


@router.get("/auth/callback/{provider}")
def auth_callback(
    provider: str,
    request: Request,
    response: Response,
    code: str | None = None,
    state: str | None = None,
    error: str | None = None,
    session_cookie: Annotated[str | None, Cookie(alias=SESSION_COOKIE)] = None,
) -> RedirectResponse:
    """OAuth/OIDC redirect target. Always a 303 to the web origin."""
    if error:
        return RedirectResponse("/?auth_error=denied", status_code=303)
    session_id = session_cookie if session_cookie and validate_session(session_cookie) else None
    if session_id is None:
        session_id = create_session()
        set_session_cookie(response, session_id, request)
    try:
        complete_auth(
            provider,
            {"code": code or "", "state": state or ""},
            session_id,
            request,
            _source(request),
        )
    except AuthError:
        return RedirectResponse("/?auth_error=failed", status_code=303)
    redirect = RedirectResponse("/", status_code=303)
    # set_session_cookie on response may not copy onto RedirectResponse
    if session_cookie is None or session_cookie != session_id:
        set_session_cookie(redirect, session_id, request)
    return redirect
