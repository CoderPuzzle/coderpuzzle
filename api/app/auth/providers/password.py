"""Username + password — the built-in credentials provider.

It is a provider, not the protocol. Hashing stays here; the identity
store keeps an opaque secret.
"""

from __future__ import annotations

import hashlib
import hmac
import os

from ... import database
from ..errors import AuthError
from ..types import AuthContext, AuthField, Identity, ProviderDescriptor
from .base import AuthProvider

_SCRYPT_N, _SCRYPT_R, _SCRYPT_P = 16384, 8, 1

USERNAME = AuthField(name="username", label="Username", kind="text", autocomplete="username")
PASSWORD = AuthField(
    name="password",
    label="Password",
    kind="password",
    autocomplete="current-password",
    min_length=8,
)
NEW_PASSWORD = AuthField(
    name="password",
    label="Password",
    kind="password",
    autocomplete="new-password",
    min_length=8,
    confirm=True,
)
ADMIN_USERNAME = AuthField(
    name="username",
    label="Username",
    kind="text",
    autocomplete="username",
    default="admin",
    readonly=True,
)


def hash_password(password: str, salt: bytes | None = None) -> str:
    if salt is None:
        salt = os.urandom(16)
    digest = hashlib.scrypt(
        password.encode("utf-8"), salt=salt, n=_SCRYPT_N, r=_SCRYPT_R, p=_SCRYPT_P, dklen=32
    )
    return f"scrypt${_SCRYPT_N}${_SCRYPT_R}${_SCRYPT_P}${salt.hex()}${digest.hex()}"


def verify_password(password: str, stored: str) -> bool:
    try:
        scheme, n, r, p, salt_hex, hash_hex = stored.split("$")
        if scheme != "scrypt":
            return False
        digest = hashlib.scrypt(
            password.encode("utf-8"),
            salt=bytes.fromhex(salt_hex),
            n=int(n),
            r=int(r),
            p=int(p),
            dklen=len(hash_hex) // 2,
        )
        return hmac.compare_digest(digest.hex(), hash_hex)
    except (ValueError, TypeError):
        return False


class PasswordProvider(AuthProvider):
    id = "password"
    auto_provision = False

    def descriptor(self, *, needs_setup: bool) -> ProviderDescriptor:
        if needs_setup:
            return ProviderDescriptor(
                id=self.id,
                label="Username and password",
                flow="credentials",
                can_login=False,
                can_register=True,
                can_bootstrap=True,
                hint="The first account is the admin. Username is fixed as admin.",
                register_fields=(ADMIN_USERNAME, NEW_PASSWORD),
            )
        return ProviderDescriptor(
            id=self.id,
            label="Username and password",
            flow="credentials",
            can_login=True,
            can_register=True,
            can_bootstrap=True,
            fields=(USERNAME, PASSWORD),
            register_fields=(USERNAME, NEW_PASSWORD),
        )

    def authenticate(self, ctx: AuthContext) -> Identity:
        username = str(ctx.payload.get("username", "")).strip()
        password = str(ctx.payload.get("password", ""))
        if not username or not password:
            raise AuthError(401, "Invalid username or password")
        row = database.get_identity("password", username)
        if row is None or not row.get("secret") or not verify_password(password, row["secret"]):
            raise AuthError(401, "Invalid username or password")
        user = database.user_by_id(row["user_id"])
        if user is None:
            raise AuthError(401, "Invalid username or password")
        return Identity(provider=self.id, subject=username, username=user["username"])

    def register(self, ctx: AuthContext) -> Identity:
        username = str(ctx.payload.get("username", "")).strip()
        password = str(ctx.payload.get("password", ""))
        if ctx.needs_setup and username != "admin":
            raise AuthError(400, "The first account must be the admin (username 'admin')")
        if not username or len(password) < 8:
            raise AuthError(
                400, "Username is required and the password must be at least 8 characters"
            )
        return Identity(
            provider=self.id,
            subject=username,
            username=username,
            secret=hash_password(password),
        )
