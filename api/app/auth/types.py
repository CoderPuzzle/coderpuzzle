"""Provider-agnostic auth types.

Three flows cover the methods we expect to add later:

- ``credentials`` — a form posted to complete (username+password).
- ``redirect`` — start returns a URL; the provider sends the browser back
  to ``GET /auth/callback/{id}`` (OAuth 2, OIDC, Sign in with Google/GitHub/X).
- ``challenge`` — start sends a one-time secret; complete verifies it
  (email+OTP, magic link).
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Literal

Flow = Literal["credentials", "redirect", "challenge"]
FieldKind = Literal["text", "password", "email"]


@dataclass(frozen=True)
class AuthField:
    name: str
    label: str
    kind: FieldKind = "text"
    autocomplete: str = ""
    required: bool = True
    min_length: int | None = None
    readonly: bool = False
    default: str | None = None
    confirm: bool = False

    def as_dict(self) -> dict[str, Any]:
        payload: dict[str, Any] = {
            "name": self.name,
            "label": self.label,
            "kind": self.kind,
            "required": self.required,
        }
        if self.autocomplete:
            payload["autocomplete"] = self.autocomplete
        if self.min_length is not None:
            payload["min_length"] = self.min_length
        if self.readonly:
            payload["readonly"] = True
        if self.default is not None:
            payload["default"] = self.default
        if self.confirm:
            payload["confirm"] = True
        return payload


@dataclass(frozen=True)
class ProviderDescriptor:
    id: str
    label: str
    flow: Flow
    can_login: bool
    can_register: bool
    can_bootstrap: bool
    hint: str = ""
    fields: tuple[AuthField, ...] = ()
    register_fields: tuple[AuthField, ...] = ()
    start_fields: tuple[AuthField, ...] = ()

    def as_dict(self) -> dict[str, Any]:
        payload: dict[str, Any] = {
            "id": self.id,
            "label": self.label,
            "flow": self.flow,
            "can_login": self.can_login,
            "can_register": self.can_register,
            "can_bootstrap": self.can_bootstrap,
            "fields": [item.as_dict() for item in self.fields],
            "register_fields": [item.as_dict() for item in self.register_fields],
            "start_fields": [item.as_dict() for item in self.start_fields],
        }
        if self.hint:
            payload["hint"] = self.hint
        return payload


@dataclass(frozen=True)
class Identity:
    """A verified subject from one provider.

    ``subject`` is unique per provider (password username, Google ``sub``,
    GitHub numeric id, email address). ``username`` is a suggested display
    handle; the core allocates a unique users.username from it.
    ``secret`` is an opaque credential the identity store keeps (password
    hash); OAuth/OTP identities leave it None.
    """

    provider: str
    subject: str
    username: str
    secret: str | None = None
    extra: dict[str, Any] = field(default_factory=dict)


@dataclass
class StartResult:
    next: Literal["complete", "redirect", "challenge"]
    redirect_url: str | None = None
    challenge_id: str | None = None
    message: str | None = None

    def as_dict(self) -> dict[str, Any]:
        payload: dict[str, Any] = {"next": self.next}
        if self.redirect_url:
            payload["redirect_url"] = self.redirect_url
        if self.challenge_id:
            payload["challenge_id"] = self.challenge_id
        if self.message:
            payload["message"] = self.message
        return payload


@dataclass
class AuthContext:
    provider: str
    payload: dict[str, Any]
    session_id: str | None
    request: Any
    needs_setup: bool
