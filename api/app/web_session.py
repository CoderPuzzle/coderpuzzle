"""HTTP session cookie helpers shared by the guest-session routes and auth."""

from typing import Annotated

from fastapi import Cookie, HTTPException, Request, Response

from .database import validate_session

SESSION_COOKIE = "coderpuzzle_session"


def current_session(
    session_cookie: Annotated[str | None, Cookie(alias=SESSION_COOKIE)] = None,
) -> str:
    """Require an active guest session; 401 otherwise (the frontend then
    shows the Continue-as-guest entrance)."""
    if session_cookie and validate_session(session_cookie):
        return session_cookie
    raise HTTPException(status_code=401, detail="No active session")


def optional_session(
    session_cookie: Annotated[str | None, Cookie(alias=SESSION_COOKIE)] = None,
) -> str | None:
    if session_cookie and validate_session(session_cookie):
        return session_cookie
    return None


def set_session_cookie(response: Response, session_id: str, request: Request) -> None:
    # Secure only when the client actually reaches us over https (the edge
    # terminates TLS and forwards the scheme); localhost/CI stay usable.
    # Deliberately a browser-session cookie (no max_age): a wall-clock cap
    # here would log active users out mid-session; expiry is the server's
    # idle clock, enforced by validate_session on every request.
    scheme = request.headers.get("x-forwarded-proto") or request.url.scheme
    response.set_cookie(
        SESSION_COOKIE,
        session_id,
        httponly=True,
        secure=scheme == "https",
        samesite="lax",
    )


def public_origin(request: Request) -> str:
    """The browser-facing origin. OAuth redirect_uris must be this, not the
    compose-internal API URL. CODERPUZZLE_PUBLIC_URL wins when set (the web
    origin, e.g. https://coderpuzzle.dongziyu.com); otherwise X-Forwarded-*
    and the request URL."""
    import os

    configured = os.environ.get("CODERPUZZLE_PUBLIC_URL", "").strip().rstrip("/")
    if configured:
        return configured
    proto = request.headers.get("x-forwarded-proto") or request.url.scheme
    host = request.headers.get("x-forwarded-host") or request.headers.get("host")
    if not host:
        return str(request.base_url).rstrip("/")
    return f"{proto}://{host}"


def auth_callback_url(request: Request, provider_id: str) -> str:
    return f"{public_origin(request)}/api/auth/callback/{provider_id}"
