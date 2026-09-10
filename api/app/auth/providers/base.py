"""AuthProvider: the only type the HTTP layer knows."""

from __future__ import annotations

from abc import ABC, abstractmethod

from ..errors import AuthError
from ..types import AuthContext, Identity, ProviderDescriptor, StartResult


class AuthProvider(ABC):
    """One sign-in method.

    Implement ``descriptor``, ``authenticate``, and optionally ``start`` /
    ``register``. Set ``auto_provision`` so a first successful complete()
    can create the user when registration is open (OAuth, email OTP).
    Password sets it False: accounts are created only through register().
    """

    id: str
    auto_provision: bool = False

    def enabled(self) -> bool:
        return True

    @abstractmethod
    def descriptor(self, *, needs_setup: bool) -> ProviderDescriptor:
        raise NotImplementedError

    def start(self, ctx: AuthContext) -> StartResult:
        """OAuth: redirect URL. OTP: send the code. Credentials: no-op."""
        return StartResult(next="complete")

    @abstractmethod
    def authenticate(self, ctx: AuthContext) -> Identity:
        """Verify a complete()/callback payload. Raise AuthError on failure."""
        raise NotImplementedError

    def register(self, ctx: AuthContext) -> Identity:
        raise AuthError(403, "Registration is not supported by this method")
