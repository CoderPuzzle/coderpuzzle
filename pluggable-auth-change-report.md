# Change report: pluggable authentication

- Date: 2026-09-09
- Repo: `CoderPuzzle/coderpuzzle`
- Branch: `main`
- Commit: `9c572635a2e36227eb675d132f7cbd2a04dbf2e2`
- Remote: `upstream` (`github.com:CoderPuzzle/coderpuzzle.git`)
- Status: landed and pushed

## Request

Make sign-in a generic interface so later work can add OAuth, OpenID,
email+OTP, and Sign in with Google / GitHub / X without rewriting the
login API. Do not hard-code username+password as the protocol.

## What changed

Login is no longer `POST /auth/login {username, password}` as the
canonical contract. That path remains as a compatibility alias.

Canonical surface:

| method | path | role |
| --- | --- | --- |
| GET | `/auth/status` | `needs_setup` + enabled provider catalog |
| POST | `/auth/start` | begin redirect or challenge |
| POST | `/auth/complete` | finish login; bind the caller's session |
| POST | `/auth/register` | create an account (bootstrap may mint a session) |
| GET | `/auth/callback/{provider}` | OAuth/OIDC return; 303 to `/` |
| POST | `/auth/logout` | unbind the user from the session |

Three provider flows:

- `credentials` — form posted to complete/register (password today)
- `redirect` — start returns a URL; callback completes (OAuth 2 / OIDC)
- `challenge` — start sends a one-time secret; complete verifies it (email OTP)

Password is one `AuthProvider` (`id: "password"`), not the HTTP protocol.
The gate UI renders from the catalog; it does not special-case username
and password fields.

## Architecture

```
HTTP (auth/http.py)
  → service (catalog, bootstrap, registration policy, throttle, session bind)
    → registry (register / get)
      → providers (password, google, github, x, oidc, email_otp)
        → store: users + auth_identities
```

- `users` — display identity (username, admin, storage scope `user:<id>`)
- `auth_identities` — `(provider, subject)` → user, optional opaque `secret`
  (password hash). One user can later hold several identities.
- `auth_challenges` — OAuth PKCE state and OTP codes, TTL-bounded

Adding a method: implement `AuthProvider`, call `register()`. No new
route and no gate rewrite. Contract test:
`tests/test_auth_providers.py::test_custom_provider_needs_no_http_changes`.

Authoritative spec: `docs/AUTH.md`.

## Built-in providers (enabled only when configured)

| id | flow | on by default | enable |
| --- | --- | --- | --- |
| `password` | credentials | yes | always |
| `google` | redirect | no | `CODERPUZZLE_AUTH_GOOGLE_CLIENT_ID` + `_SECRET` |
| `github` | redirect | no | `CODERPUZZLE_AUTH_GITHUB_CLIENT_ID` + `_SECRET` |
| `x` | redirect | no | `CODERPUZZLE_AUTH_X_CLIENT_ID` + `_SECRET` |
| `oidc` | redirect | no | issuer + client id + secret |
| `email_otp` | challenge | no | `CODERPUZZLE_AUTH_EMAIL_OTP=1` and SMTP |

OAuth uses authorization-code + PKCE. Callback URL is
`{CODERPUZZLE_PUBLIC_URL}/api/auth/callback/{id}`.

Registration stays closed after the first admin unless
`CODERPUZZLE_AUTH_REGISTRATION=open`. Redirect/challenge providers
auto-provision on first complete only while registration is open.
Password never auto-provisions.

Bootstrap: any `can_bootstrap` provider can create the first user
(admin). The password provider still requires username `admin`.

## Compatibility

- `POST /auth/login {username, password}` → complete as `provider=password`
- `POST /auth/register` without `provider` → password
- Existing DBs: `users.password_hash` is copied into a `password`
  identity on `initialize_database`. New installs have no password
  column on `users`.

## Files (28, +2319 / −287)

Backend: `api/app/auth/**`, `api/app/web_session.py`, `api/app/database.py`,
`api/app/main.py` (auth routes moved out), `compose.yaml` (auth env + API
on `edge` for outbound token/SMTP), `api/Dockerfile` comment.

Frontend: `frontend/src/api.ts`, `App.tsx` (catalog-driven GuestGate),
`styles.css`; `scripts/stub-server.mjs` stub catalog.

Docs: `docs/AUTH.md` (new), `docs/API.md`, `docs/api-and-cli.md`,
`README.md`, `CLAUDE.md`, `TODO.md`.

Tests: `tests/test_auth_providers.py` (catalog, password via provider
field, compat alias, unknown provider, custom provider, mocked Google
start/complete, email OTP round-trip, legacy hash migration);
`tests/test_api_surface.py` asserts `providers` on `/auth/status`.

## Verification

- `python3 -m pytest tests` — 177 passed
- Frontend `tsc -b` — clean
- Browser (Vite :5173 + local API :8000, empty DB):
  1. Gate shows password-provider hint and “Set up admin”
  2. Form is catalog-driven (readonly username `admin`, password + confirm)
  3. Create admin → problem list
  4. Exit session → “Continue as guest” + “Log in” (no create-account;
     registration closed)
  5. Log in as admin → problem list

OAuth/OTP against live Google/GitHub/X/SMTP was not exercised; those
providers stay out of the catalog until env is set. OAuth and OTP paths
are covered with mocks.

## Follow-ups (not in this commit)

- Account linking UI (schema already allows multiple identities per user)
- Admin surface (list/delete accounts, reset password) — still in `TODO.md`
- Opening registration in production (`CODERPUZZLE_AUTH_REGISTRATION=open`)
- Configuring real OAuth client IDs and `CODERPUZZLE_PUBLIC_URL` on `katze`

## How to add Sign in with Google later

1. Create a Google OAuth client. Authorized redirect URI:
   `https://coderpuzzle.dongziyu.com/api/auth/callback/google`
2. Set on the API container:
   `CODERPUZZLE_PUBLIC_URL`, `CODERPUZZLE_AUTH_GOOGLE_CLIENT_ID`,
   `CODERPUZZLE_AUTH_GOOGLE_CLIENT_SECRET`
3. Restart the stack. `GET /auth/status` will list `google`; the gate
   shows “Continue with Google”. No code change.
