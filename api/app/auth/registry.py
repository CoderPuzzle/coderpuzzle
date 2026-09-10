"""In-process provider registry.

Adding a sign-in method is: implement AuthProvider, call ``register``.
The HTTP layer never names a provider id.
"""

from __future__ import annotations

from .providers.base import AuthProvider

_providers: dict[str, AuthProvider] = {}
_defaults_loaded = False


def register(provider: AuthProvider) -> None:
    _providers[provider.id] = provider


def unregister(provider_id: str) -> None:
    _providers.pop(provider_id, None)


def get(provider_id: str) -> AuthProvider | None:
    return _providers.get(provider_id)


def all_providers() -> list[AuthProvider]:
    return list(_providers.values())


def reset() -> None:
    """Tests: drop every provider (including builtins)."""
    global _defaults_loaded
    _providers.clear()
    _defaults_loaded = False


def load_defaults() -> None:
    """Idempotent. Builtins are always registered; disabled ones stay in
    the registry but are omitted from the public catalog."""
    global _defaults_loaded
    if _defaults_loaded:
        return
    from .providers import builtin_providers

    for provider in builtin_providers():
        register(provider)
    _defaults_loaded = True
