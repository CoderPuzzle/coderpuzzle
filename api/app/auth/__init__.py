"""Pluggable authentication.

Callers talk to providers through a shared HTTP surface (start / complete /
register / callback). Password login is one provider, not the protocol.
See docs/AUTH.md.
"""

from .registry import all_providers, get, load_defaults, register, reset, unregister
from .service import catalog, complete_auth, register_auth, start_auth

__all__ = [
    "all_providers",
    "catalog",
    "complete_auth",
    "get",
    "load_defaults",
    "register",
    "register_auth",
    "reset",
    "start_auth",
    "unregister",
]
