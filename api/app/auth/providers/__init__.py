"""Built-in providers. Disabled ones stay registered but leave the catalog."""

from .base import AuthProvider
from .email_otp import EmailOtpProvider
from .oauth import github_provider, google_provider, oidc_provider, x_provider
from .password import PasswordProvider


def builtin_providers() -> list[AuthProvider]:
    return [
        PasswordProvider(),
        google_provider(),
        github_provider(),
        x_provider(),
        oidc_provider(),
        EmailOtpProvider(),
    ]
