"""Pluggable auth: catalog, password as one provider, OAuth/OTP/custom extras."""

from __future__ import annotations

import os
import tempfile
import unittest
from pathlib import Path
from unittest import mock
from urllib.parse import parse_qs, urlparse

from fastapi.testclient import TestClient

from api.app import database
from api.app import main as api_main
from api.app.auth.errors import AuthError
from api.app.auth.providers.base import AuthProvider
from api.app.auth.providers.email_otp import EmailOtpProvider
from api.app.auth.providers.password import hash_password
from api.app.auth.registry import register, unregister
from api.app.auth.types import AuthContext, AuthField, Identity, ProviderDescriptor


class TokenProvider(AuthProvider):
    """Proves a new method is register() plus this class — no HTTP changes."""

    id = "devtoken"
    auto_provision = True

    def descriptor(self, *, needs_setup: bool) -> ProviderDescriptor:
        return ProviderDescriptor(
            id=self.id,
            label="Dev token",
            flow="credentials",
            can_login=True,
            can_register=False,
            can_bootstrap=True,
            fields=(AuthField(name="token", label="Token"),),
        )

    def authenticate(self, ctx: AuthContext) -> Identity:
        if ctx.payload.get("token") != "secret":
            raise AuthError(401, "Invalid token")
        return Identity(provider=self.id, subject="dev-subject", username="dev")


class AuthProviderTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        path = Path(self.temporary.name) / "test.sqlite3"
        patcher = mock.patch.object(database, "DATABASE_PATH", path)
        patcher.start()
        self.addCleanup(patcher.stop)
        database.initialize_database()
        self.client = TestClient(api_main.app)
        self.addCleanup(self.client.close)

    def test_status_lists_password_and_not_unconfigured_oauth(self):
        status = self.client.get("/auth/status").json()
        self.assertTrue(status["needs_setup"])
        ids = [item["id"] for item in status["providers"]]
        self.assertIn("password", ids)
        self.assertNotIn("google", ids)
        self.assertNotIn("github", ids)
        self.assertNotIn("email_otp", ids)
        password = next(item for item in status["providers"] if item["id"] == "password")
        self.assertEqual("credentials", password["flow"])
        self.assertTrue(password["can_bootstrap"])
        self.assertTrue(password["can_register"])
        self.assertFalse(password["can_login"])

    def test_register_and_complete_go_through_the_provider_field(self):
        created = self.client.post(
            "/auth/register",
            json={"provider": "password", "username": "admin", "password": "password123"},
        )
        self.assertEqual(200, created.status_code)
        self.assertTrue(created.json()["is_admin"])
        status = self.client.get("/auth/status").json()
        self.assertFalse(status["needs_setup"])
        password = next(item for item in status["providers"] if item["id"] == "password")
        self.assertTrue(password["can_login"])
        self.assertFalse(password["can_register"])
        denied = self.client.post(
            "/auth/register",
            json={"provider": "password", "username": "other", "password": "password123"},
        )
        self.assertEqual(403, denied.status_code)
        session = TestClient(api_main.app)
        self.addCleanup(session.close)
        self.assertEqual(
            401,
            session.post(
                "/auth/complete",
                json={"provider": "password", "username": "admin", "password": "password123"},
            ).status_code,
        )
        session.post("/session")
        ok = session.post(
            "/auth/complete",
            json={"provider": "password", "username": "admin", "password": "password123"},
        )
        self.assertEqual(200, ok.status_code)
        self.assertEqual("admin", session.get("/session").json()["user"]["username"])

    def test_compat_login_alias_still_binds_password(self):
        self.client.post(
            "/auth/register", json={"username": "admin", "password": "password123"}
        )
        session = TestClient(api_main.app)
        self.addCleanup(session.close)
        session.post("/session")
        ok = session.post(
            "/auth/login", json={"username": "admin", "password": "password123"}
        )
        self.assertEqual(200, ok.status_code)
        self.assertEqual("logged_in", ok.json()["status"])

    def test_unknown_provider_is_rejected(self):
        self.client.post("/session")
        response = self.client.post(
            "/auth/complete", json={"provider": "not-a-method", "token": "x"}
        )
        self.assertEqual(400, response.status_code)

    def test_custom_provider_needs_no_http_changes(self):
        register(TokenProvider())
        self.addCleanup(lambda: unregister("devtoken"))
        self.client.post("/session")
        ids = [item["id"] for item in self.client.get("/auth/status").json()["providers"]]
        self.assertIn("devtoken", ids)
        ok = self.client.post(
            "/auth/complete", json={"provider": "devtoken", "token": "secret"}
        )
        self.assertEqual(200, ok.status_code)
        self.assertEqual("dev", ok.json()["username"])
        self.assertTrue(ok.json()["is_admin"])
        self.assertEqual("dev", self.client.get("/session").json()["user"]["username"])

    def test_oauth_start_and_complete_when_configured(self):
        env = {
            "CODERPUZZLE_AUTH_GOOGLE_CLIENT_ID": "google-client",
            "CODERPUZZLE_AUTH_GOOGLE_CLIENT_SECRET": "google-secret",
            "CODERPUZZLE_PUBLIC_URL": "http://testserver",
            "CODERPUZZLE_AUTH_REGISTRATION": "open",
        }
        with mock.patch.dict(os.environ, env, clear=False):
            self.client.post(
                "/auth/register",
                json={"provider": "password", "username": "admin", "password": "password123"},
            )
            session = TestClient(api_main.app)
            self.addCleanup(session.close)
            session.post("/session")
            ids = [item["id"] for item in session.get("/auth/status").json()["providers"]]
            self.assertIn("google", ids)
            started = session.post("/auth/start", json={"provider": "google"})
            self.assertEqual(200, started.status_code)
            redirect = started.json()["redirect_url"]
            self.assertTrue(redirect.startswith("https://accounts.google.com/"))
            query = parse_qs(urlparse(redirect).query)
            self.assertEqual(["google-client"], query["client_id"])
            self.assertEqual(
                ["http://testserver/api/auth/callback/google"], query["redirect_uri"]
            )
            state = query["state"][0]

            def fake_http(method, url, *, headers=None, form=None, timeout=15):
                if "oauth2.googleapis.com/token" in url:
                    self.assertEqual("authorization_code", form["grant_type"])
                    self.assertEqual("auth-code", form["code"])
                    return {"access_token": "ya29.tok"}
                if "userinfo" in url:
                    return {"sub": "google-sub-1", "email": "ada@example.com", "name": "Ada"}
                self.fail(url)

            with mock.patch("api.app.auth.providers.oauth.http_json", side_effect=fake_http):
                done = session.post(
                    "/auth/complete",
                    json={"provider": "google", "code": "auth-code", "state": state},
                )
            self.assertEqual(200, done.status_code)
            self.assertEqual("ada", done.json()["username"])
            self.assertFalse(done.json()["is_admin"])

    def test_email_otp_challenge_round_trip(self):
        inbox: list[tuple[str, str]] = []

        def sender(to: str, subject: str, body: str) -> None:
            inbox.append((to, body))

        register(EmailOtpProvider(sender=sender))
        self.addCleanup(lambda: register(EmailOtpProvider()))
        env = {
            "CODERPUZZLE_AUTH_EMAIL_OTP": "1",
            "CODERPUZZLE_AUTH_REGISTRATION": "open",
        }
        with mock.patch.dict(os.environ, env, clear=False):
            self.client.post(
                "/auth/register",
                json={"provider": "password", "username": "admin", "password": "password123"},
            )
            session = TestClient(api_main.app)
            self.addCleanup(session.close)
            session.post("/session")
            started = session.post(
                "/auth/start", json={"provider": "email_otp", "email": "ada@example.com"}
            )
            self.assertEqual(200, started.status_code)
            self.assertEqual("challenge", started.json()["next"])
            self.assertTrue(inbox)
            code = inbox[0][1].split("is ", 1)[1].split(".", 1)[0]
            done = session.post(
                "/auth/complete",
                json={
                    "provider": "email_otp",
                    "challenge_id": started.json()["challenge_id"],
                    "code": code,
                },
            )
            self.assertEqual(200, done.status_code)
            self.assertEqual("ada", done.json()["username"])

    def test_legacy_password_hash_migrates_into_identities(self):
        with database.connect() as connection:
            connection.execute("DROP TABLE IF EXISTS users")
            connection.execute(
                """
                CREATE TABLE users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT NOT NULL UNIQUE,
                    password_hash TEXT NOT NULL,
                    is_admin INTEGER NOT NULL DEFAULT 0,
                    created_at REAL NOT NULL
                )
                """
            )
            connection.execute(
                "INSERT INTO users (username, password_hash, is_admin, created_at) VALUES (?, ?, 1, 1)",
                ("admin", hash_password("password123")),
            )
        database.initialize_database()
        identity = database.get_identity("password", "admin")
        self.assertIsNotNone(identity)
        session = TestClient(api_main.app)
        self.addCleanup(session.close)
        session.post("/session")
        ok = session.post(
            "/auth/complete",
            json={"provider": "password", "username": "admin", "password": "password123"},
        )
        self.assertEqual(200, ok.status_code)


if __name__ == "__main__":
    unittest.main()
