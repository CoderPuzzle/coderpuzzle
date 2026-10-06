"""Email + one-time code — a challenge-flow provider.

Disabled unless CODERPUZZLE_AUTH_EMAIL_OTP is on and a sender is
available (SMTP env, or a test-injected backend). Adding it later is
configuration plus a mailer, not a new HTTP route.
"""

from __future__ import annotations

import hashlib
import hmac
import os
import re
import secrets
import smtplib
from email.message import EmailMessage
from typing import Callable

from ... import database
from ..errors import AuthError
from ..types import AuthContext, AuthField, Identity, ProviderDescriptor, StartResult
from .base import AuthProvider

_EMAIL = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
_TTL = 600
_MAX_ATTEMPTS = 5

EMAIL_FIELD = AuthField(name="email", label="Email", kind="email", autocomplete="email")
CODE_FIELD = AuthField(name="code", label="Sign-in code", kind="text", autocomplete="one-time-code")

Sender = Callable[[str, str, str], None]


def _env_on(name: str) -> bool:
    return os.environ.get(name, "").strip().lower() in {"1", "true", "yes", "on"}


def _hash_code(code: str) -> str:
    return hashlib.sha256(code.encode("utf-8")).hexdigest()


def smtp_send(to: str, subject: str, body: str) -> None:
    host = os.environ.get("CODERPUZZLE_AUTH_SMTP_HOST", "").strip()
    if not host:
        raise AuthError(503, "Email sign-in is not configured")
    port = int(os.environ.get("CODERPUZZLE_AUTH_SMTP_PORT", "587") or "587")
    user = os.environ.get("CODERPUZZLE_AUTH_SMTP_USER", "").strip()
    password = os.environ.get("CODERPUZZLE_AUTH_SMTP_PASSWORD", "")
    from_addr = os.environ.get("CODERPUZZLE_AUTH_SMTP_FROM", user or "noreply@localhost")
    message = EmailMessage()
    message["To"] = to
    message["From"] = from_addr
    message["Subject"] = subject
    message.set_content(body)
    with smtplib.SMTP(host, port, timeout=15) as smtp:
        if _env_on("CODERPUZZLE_AUTH_SMTP_STARTTLS") or port == 587:
            smtp.starttls()
        if user:
            smtp.login(user, password)
        smtp.send_message(message)


class EmailOtpProvider(AuthProvider):
    id = "email_otp"
    auto_provision = True

    def __init__(self, sender: Sender | None = None) -> None:
        self.sender = sender

    def _sender(self) -> Sender | None:
        if self.sender is not None:
            return self.sender
        if os.environ.get("CODERPUZZLE_AUTH_SMTP_HOST", "").strip():
            return smtp_send
        return None

    def enabled(self) -> bool:
        return _env_on("CODERPUZZLE_AUTH_EMAIL_OTP") and self._sender() is not None

    def descriptor(self, *, needs_setup: bool) -> ProviderDescriptor:
        return ProviderDescriptor(
            id=self.id,
            label="Email code",
            flow="challenge",
            can_login=not needs_setup,
            can_register=True,
            can_bootstrap=True,
            hint="We'll email a one-time sign-in code.",
            start_fields=(EMAIL_FIELD,),
            fields=(CODE_FIELD,),
        )

    def start(self, ctx: AuthContext) -> StartResult:
        email = str(ctx.payload.get("email", "")).strip().lower()
        if not _EMAIL.fullmatch(email):
            raise AuthError(400, "A valid email address is required")
        sender = self._sender()
        if sender is None:
            raise AuthError(503, "Email sign-in is not configured")
        code = f"{secrets.randbelow(1_000_000):06d}"
        challenge_id = secrets.token_urlsafe(16)
        database.save_auth_challenge(
            challenge_id,
            self.id,
            ctx.session_id,
            {"email": email, "code_hash": _hash_code(code), "attempts": 0},
            ttl_seconds=_TTL,
        )
        sender(
            email,
            "Your CoderPuzzle sign-in code",
            f"Your sign-in code is {code}. It expires in 10 minutes.\n",
        )
        return StartResult(
            next="challenge",
            challenge_id=challenge_id,
            message="Check your email for a sign-in code.",
        )

    def authenticate(self, ctx: AuthContext) -> Identity:
        challenge_id = str(ctx.payload.get("challenge_id") or "")
        code = str(ctx.payload.get("code") or "").strip()
        if not challenge_id or not code:
            raise AuthError(401, "Invalid or expired sign-in code")
        row = database.get_auth_challenge(challenge_id)
        if row is None or row["provider"] != self.id:
            raise AuthError(401, "Invalid or expired sign-in code")
        payload = row["payload"]
        attempts = int(payload.get("attempts") or 0)
        if attempts >= _MAX_ATTEMPTS:
            database.consume_auth_challenge(challenge_id)
            raise AuthError(401, "Invalid or expired sign-in code")
        stored = str(payload.get("code_hash") or "")
        if not hmac.compare_digest(stored, _hash_code(code)):
            payload["attempts"] = attempts + 1
            database.update_auth_challenge(challenge_id, payload)
            raise AuthError(401, "Invalid or expired sign-in code")
        database.consume_auth_challenge(challenge_id)
        email = str(payload.get("email") or "")
        username = email.split("@", 1)[0] if email else "user"
        return Identity(
            provider=self.id,
            subject=email,
            username=username,
            extra={"email": email},
        )
