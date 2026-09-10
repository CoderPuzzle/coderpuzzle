# Authentication architecture

Sign-in is a **provider interface**, not a username/password endpoint with
extra flags. Password login is the first provider. OAuth, OpenID Connect,
email+OTP, and Sign in with Google/GitHub/X plug in as additional
providers without new HTTP routes.

## Layers

| layer | owns |
| --- | --- |
| HTTP (`api/app/auth/http.py`) | `/auth/status`, `/auth/start`, `/auth/complete`, `/auth/register`, `/auth/callback/{provider}`, `/auth/logout` |
| service (`api/app/auth/service.py`) | catalog, bootstrap, registration policy, session bind, throttle |
| registry (`api/app/auth/registry.py`) | `register(provider)` / `get(id)` |
| providers (`api/app/auth/providers/`) | verify a payload and return an `Identity` |
| store (`api/app/database.py`) | `users` (display identity) + `auth_identities` (one row per provider subject) |

The HTTP layer never names `password`, `google`, or `email_otp`. Adding a
method is: implement `AuthProvider`, call `register()`, optionally set env
so `enabled()` is true.

## Flows

Every provider declares one flow. The gate UI renders from the catalog;
it does not special-case password.

- **`credentials`** — a form posted to `POST /auth/complete` (or
  `/auth/register`). Fields come from the catalog (`fields` /
  `register_fields`).
- **`redirect`** — `POST /auth/start` returns `{next: "redirect",
  redirect_url}`. The browser leaves the site; the provider sends it back
  to `GET /auth/callback/{id}?code&state`, which completes and 303s to
  `/`. OAuth 2 / OIDC / Sign in with Google, GitHub, X.
- **`challenge`** — `POST /auth/start` sends a one-time secret and
  returns `{next: "challenge", challenge_id}`. `POST /auth/complete`
  verifies it. Email+OTP.

## Identity vs credentials

`users` is the account (username, admin flag, storage scope
`user:<id>`). `auth_identities` is `(provider, subject)` → that user,
with an optional opaque `secret` (password hash). One user can hold
several identities later (link Google to an existing password account)
without changing the session or progress model.

Existing deployments: `initialize_database` copies a legacy
`users.password_hash` into a `password` identity. New installs have no
password column on `users`.

## HTTP contract

Public, no session: `GET /auth/status`, `POST /auth/register`.

```json
GET /auth/status
{
  "needs_setup": true,
  "providers": [
    {
      "id": "password",
      "label": "Username and password",
      "flow": "credentials",
      "can_login": false,
      "can_register": true,
      "can_bootstrap": true,
      "hint": "The first account is the admin. Username is fixed as admin.",
      "fields": [],
      "register_fields": [ { "name": "username", "…": "…" }, { "name": "password", "confirm": true, "min_length": 8 } ],
      "start_fields": []
    }
  ]
}
```

Only **enabled** providers appear. OAuth/OIDC/email OTP stay out of the
catalog until configured.

```
POST /auth/start     {provider, …fields}   → {next, redirect_url?, challenge_id?, message?}
POST /auth/complete  {provider, …fields}   → {status: "logged_in", username, is_admin}
POST /auth/register  {provider, …fields}   → {status: "registered", username, is_admin}
GET  /auth/callback/{provider}?code&state  → 303 /
POST /auth/logout
```

`POST /auth/complete` and `/auth/login` require an active session
(login binds the caller's cookie; it does not mint one). Register may
create the session — bootstrap has no cookie yet.

Compatibility aliases, so existing scripts keep working:

- `POST /auth/login {username, password}` → complete as `provider=password`
- `POST /auth/register` without `provider` → password

Prefer the `provider` field on new callers.

## Built-in providers

| id | flow | enabled when |
| --- | --- | --- |
| `password` | credentials | always |
| `google` | redirect | `CODERPUZZLE_AUTH_GOOGLE_CLIENT_ID` + `_SECRET` |
| `github` | redirect | `CODERPUZZLE_AUTH_GITHUB_CLIENT_ID` + `_SECRET` |
| `x` | redirect | `CODERPUZZLE_AUTH_X_CLIENT_ID` + `_SECRET` |
| `oidc` | redirect | `CODERPUZZLE_AUTH_OIDC_ISSUER` + `_CLIENT_ID` + `_SECRET` |
| `email_otp` | challenge | `CODERPUZZLE_AUTH_EMAIL_OTP=1` and SMTP (`CODERPUZZLE_AUTH_SMTP_HOST`, …) |

OAuth uses authorization code + PKCE. Callback URL:

```
{CODERPUZZLE_PUBLIC_URL}/api/auth/callback/{id}
```

Set `CODERPUZZLE_PUBLIC_URL` to the **web** origin (e.g.
`https://coderpuzzle.dongziyu.com`). The API's compose-internal URL is
not a valid redirect_uri. If unset, the API derives the origin from
`X-Forwarded-Proto` / `Host`.

Token exchange and SMTP need outbound HTTPS. The API container is on
the compose `edge` network for that; it still publishes no ports. The
runner stays `network_mode: none`.

## Registration policy

`CODERPUZZLE_AUTH_REGISTRATION` is `closed` (default) or `open`.

- Fresh install (`needs_setup`): any `can_bootstrap` provider can create
  the first user, who is admin. The password provider still requires
  username `admin`.
- Afterwards, `POST /auth/register` is 403 until registration is `open`.
- Redirect and challenge providers with `auto_provision=True` create a
  user on first successful complete **only while registration is open**.
  Password never auto-provisions — accounts are created through register.

## Adding a provider

1. Subclass `AuthProvider` (`api/app/auth/providers/base.py`).
2. Implement `descriptor`, `authenticate`; optionally `start`, `register`.
3. Set `auto_provision` if a first complete() should create the user
   (OAuth/OTP: yes; password: no).
4. `register(YourProvider())` from `builtin_providers()` or at startup.
5. Gate and HTTP need no changes — they read the catalog.

A credentials provider is a form. A redirect provider is almost always
an `OAuth2Provider` preset or a new one with authorize/token/userinfo
URLs. A challenge provider stores state in `auth_challenges` (see
`EmailOtpProvider`).

The test `test_custom_provider_needs_no_http_changes` is the contract:
a 20-line class plus `register()` is enough.

## Throttle

Failed `complete` attempts are counted per client IP, 10 per minute,
**before** provider work (so a throttled caller does no scrypt or token
exchange). The API trusts `X-Forwarded-For` because uvicorn runs with
`--proxy-headers` and the only path in is frontend nginx.
