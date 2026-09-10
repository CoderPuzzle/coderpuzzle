"""OAuth 2.0 / OIDC authorization-code providers.

One class, table-driven presets (Google, GitHub, X) plus a generic OIDC
issuer. A provider is enabled only when its client id and secret are set;
adding Sign in with Google is therefore configuration, not a new route.
"""

from __future__ import annotations

import base64
import hashlib
import json
import os
import secrets
import urllib.error
import urllib.parse
import urllib.request
from typing import Any

from ... import database
from ...web_session import auth_callback_url
from ..errors import AuthError
from ..types import AuthContext, Identity, ProviderDescriptor, StartResult
from .base import AuthProvider

_CHALLENGE_TTL = 600


def _pkce_challenge(verifier: str) -> str:
    digest = hashlib.sha256(verifier.encode("ascii")).digest()
    return base64.urlsafe_b64encode(digest).rstrip(b"=").decode("ascii")


def http_json(
    method: str,
    url: str,
    *,
    headers: dict[str, str] | None = None,
    form: dict[str, str] | None = None,
    timeout: float = 15,
) -> dict[str, Any]:
    data = urllib.parse.urlencode(form).encode() if form is not None else None
    request = urllib.request.Request(url, data=data, method=method, headers=headers or {})
    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            body = response.read()
    except urllib.error.HTTPError as error:
        raise AuthError(401, "Sign-in with this provider failed") from error
    except urllib.error.URLError as error:
        raise AuthError(503, "Could not reach the identity provider") from error
    if not body:
        return {}
    try:
        parsed = json.loads(body)
    except json.JSONDecodeError as error:
        raise AuthError(401, "Sign-in with this provider failed") from error
    if not isinstance(parsed, dict):
        raise AuthError(401, "Sign-in with this provider failed")
    return parsed


class OAuth2Provider(AuthProvider):
    auto_provision = True

    def __init__(
        self,
        provider_id: str,
        label: str,
        *,
        client_id_env: str,
        client_secret_env: str,
        authorize_url: str = "",
        token_url: str = "",
        userinfo_url: str = "",
        scopes: tuple[str, ...] = (),
        subject_key: str = "sub",
        username_keys: tuple[str, ...] = ("preferred_username", "email", "login", "name"),
        userinfo_data_key: str | None = None,
        token_headers: dict[str, str] | None = None,
        issuer_env: str = "",
    ) -> None:
        self.id = provider_id
        self.label = label
        self.client_id_env = client_id_env
        self.client_secret_env = client_secret_env
        self.issuer_env = issuer_env
        self._authorize_url = authorize_url
        self._token_url = token_url
        self._userinfo_url = userinfo_url
        self.scopes = scopes
        self.subject_key = subject_key
        self.username_keys = username_keys
        self.userinfo_data_key = userinfo_data_key
        self.token_headers = token_headers or {"Accept": "application/json"}

    def _client_id(self) -> str:
        return os.environ.get(self.client_id_env, "").strip()

    def _client_secret(self) -> str:
        return os.environ.get(self.client_secret_env, "").strip()

    def _issuer(self) -> str:
        return os.environ.get(self.issuer_env, "").strip().rstrip("/")

    def enabled(self) -> bool:
        if not (self._client_id() and self._client_secret()):
            return False
        if self.issuer_env:
            return bool(self._issuer())
        return bool(self._authorize_url and self._token_url and self._userinfo_url)

    def _discover(self) -> None:
        if not self.issuer_env or (self._authorize_url and self._token_url):
            return
        doc = http_json("GET", f"{self._issuer()}/.well-known/openid-configuration")
        self._authorize_url = str(doc.get("authorization_endpoint") or "")
        self._token_url = str(doc.get("token_endpoint") or "")
        self._userinfo_url = str(doc.get("userinfo_endpoint") or "")
        if not (self._authorize_url and self._token_url):
            raise AuthError(503, "The OpenID issuer did not advertise endpoints")

    def descriptor(self, *, needs_setup: bool) -> ProviderDescriptor:
        return ProviderDescriptor(
            id=self.id,
            label=self.label,
            flow="redirect",
            can_login=not needs_setup,
            can_register=True,
            can_bootstrap=True,
            hint=f"Sign in with {self.label}.",
        )

    def start(self, ctx: AuthContext) -> StartResult:
        if ctx.session_id is None:
            raise AuthError(401, "No active session")
        self._discover()
        state = secrets.token_urlsafe(24)
        verifier = secrets.token_urlsafe(32)
        database.save_auth_challenge(
            state,
            self.id,
            ctx.session_id,
            {"verifier": verifier},
            ttl_seconds=_CHALLENGE_TTL,
        )
        params = {
            "client_id": self._client_id(),
            "redirect_uri": auth_callback_url(ctx.request, self.id),
            "response_type": "code",
            "scope": " ".join(self.scopes),
            "state": state,
            "code_challenge": _pkce_challenge(verifier),
            "code_challenge_method": "S256",
        }
        url = f"{self._authorize_url}?{urllib.parse.urlencode(params)}"
        return StartResult(next="redirect", redirect_url=url)

    def authenticate(self, ctx: AuthContext) -> Identity:
        self._discover()
        code = str(ctx.payload.get("code") or "")
        state = str(ctx.payload.get("state") or "")
        if not code or not state:
            raise AuthError(401, "Sign-in with this provider failed")
        challenge = database.consume_auth_challenge(state)
        if challenge is None or challenge["provider"] != self.id:
            raise AuthError(401, "That sign-in attempt expired")
        verifier = str(challenge.get("payload", {}).get("verifier") or "")
        token = http_json(
            "POST",
            self._token_url,
            headers=self.token_headers,
            form={
                "grant_type": "authorization_code",
                "code": code,
                "redirect_uri": auth_callback_url(ctx.request, self.id),
                "client_id": self._client_id(),
                "client_secret": self._client_secret(),
                "code_verifier": verifier,
            },
        )
        access = str(token.get("access_token") or "")
        if not access:
            raise AuthError(401, "Sign-in with this provider failed")
        userinfo = http_json(
            "GET",
            self._userinfo_url,
            headers={"Authorization": f"Bearer {access}", "Accept": "application/json"},
        )
        if self.userinfo_data_key:
            inner = userinfo.get(self.userinfo_data_key)
            if not isinstance(inner, dict):
                raise AuthError(401, "Sign-in with this provider failed")
            userinfo = inner
        subject = userinfo.get(self.subject_key)
        if subject is None or str(subject) == "":
            raise AuthError(401, "Sign-in with this provider failed")
        username = ""
        for key in self.username_keys:
            value = userinfo.get(key)
            if isinstance(value, str) and value.strip():
                username = value.strip()
                break
        if "@" in username:
            username = username.split("@", 1)[0]
        if not username:
            username = f"{self.id}-user"
        extra = {key: userinfo[key] for key in ("email", "name", "login") if key in userinfo}
        return Identity(
            provider=self.id,
            subject=str(subject),
            username=username,
            extra=extra,
        )


def google_provider() -> OAuth2Provider:
    return OAuth2Provider(
        "google",
        "Google",
        client_id_env="CODERPUZZLE_AUTH_GOOGLE_CLIENT_ID",
        client_secret_env="CODERPUZZLE_AUTH_GOOGLE_CLIENT_SECRET",
        authorize_url="https://accounts.google.com/o/oauth2/v2/auth",
        token_url="https://oauth2.googleapis.com/token",
        userinfo_url="https://openidconnect.googleapis.com/v1/userinfo",
        scopes=("openid", "email", "profile"),
        subject_key="sub",
        username_keys=("preferred_username", "email", "name"),
    )


def github_provider() -> OAuth2Provider:
    return OAuth2Provider(
        "github",
        "GitHub",
        client_id_env="CODERPUZZLE_AUTH_GITHUB_CLIENT_ID",
        client_secret_env="CODERPUZZLE_AUTH_GITHUB_CLIENT_SECRET",
        authorize_url="https://github.com/login/oauth/authorize",
        token_url="https://github.com/login/oauth/access_token",
        userinfo_url="https://api.github.com/user",
        scopes=("read:user", "user:email"),
        subject_key="id",
        username_keys=("login", "name"),
    )


def x_provider() -> OAuth2Provider:
    return OAuth2Provider(
        "x",
        "X",
        client_id_env="CODERPUZZLE_AUTH_X_CLIENT_ID",
        client_secret_env="CODERPUZZLE_AUTH_X_CLIENT_SECRET",
        authorize_url="https://twitter.com/i/oauth2/authorize",
        token_url="https://api.twitter.com/2/oauth2/token",
        userinfo_url="https://api.twitter.com/2/users/me",
        scopes=("users.read", "tweet.read"),
        subject_key="id",
        username_keys=("username", "name"),
        userinfo_data_key="data",
    )


def oidc_provider() -> OAuth2Provider:
    scopes_env = os.environ.get("CODERPUZZLE_AUTH_OIDC_SCOPES", "openid email profile")
    label = os.environ.get("CODERPUZZLE_AUTH_OIDC_LABEL", "OpenID").strip() or "OpenID"
    return OAuth2Provider(
        "oidc",
        label,
        client_id_env="CODERPUZZLE_AUTH_OIDC_CLIENT_ID",
        client_secret_env="CODERPUZZLE_AUTH_OIDC_CLIENT_SECRET",
        issuer_env="CODERPUZZLE_AUTH_OIDC_ISSUER",
        scopes=tuple(part for part in scopes_env.split() if part),
        subject_key="sub",
        username_keys=("preferred_username", "email", "name"),
    )
