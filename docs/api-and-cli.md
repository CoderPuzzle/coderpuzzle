# CoderPuzzle REST API and docker image CLI

One toolchain, two interfaces. The runner image
(`ghcr.io/coderpuzzle/coderpuzzle`) carries every pinned language tool and
executor; the REST API drives the web UI, and the `coderpuzzle` CLI
(installed in the image from `runner/cli.py`) drives authoring and CI.
Formatting is the same code in both — see the tri-state contract below.

## REST API

### Base URL

The API is served at the web UI's same origin, under `/api/` — the web
service's published port, 8081 by default, with the edge terminating TLS
living outside this repo. The examples below assume that origin:

```sh
BASE=http://localhost:8081/api
```

Sessions are cookie-based. Everything except `GET /health`, `GET
/auth/status`, and `POST /auth/register` requires a `coderpuzzle_session`
cookie from `POST /session`; authenticated callers additionally carry the
session of a signed-in user. Auth is a provider catalog (password is one
method, not the protocol) — see [AUTH.md](AUTH.md). Treat any deployment's
API as public and rate-limit at the edge if you expose it.

### Sessions

A session is an HttpOnly cookie created on demand. Every request carrying a
valid cookie refreshes the idle clock; the session idles out after one hour,
and an expired session and everything it owns (drafts, submissions) is
deleted.

```sh
# Create a session (keep the cookie jar)
curl -c jar.txt -X POST $BASE/session
# {"status":"active","idle_seconds":3600}

# Check it
curl -b jar.txt $BASE/session

# Validate without extending the idle clock (the frontend's inactivity
# watcher probes with this — watching must not keep an abandoned session alive)
curl -b jar.txt "$BASE/session?touch=0"
```

`GET /session` returns `{"status", "idle_seconds", "user"}` where `user` is
`null` for a guest or `{"username", "is_admin"}` when signed in. A request
without a valid cookie gets `401 {"detail":"No active session"}`.

### Auth (pluggable providers; see [AUTH.md](AUTH.md))

- `GET /auth/status` → `{"needs_setup": bool, "providers": […]}` —
  public; true until the first account exists. `providers` is the
  enabled catalog (id, flow, fields, can_login / can_register /
  can_bootstrap). Password is always present; OAuth/OIDC/email OTP
  appear when configured.
- `POST /auth/start` `{provider, …}` — begin a redirect or challenge
  flow. → `{next: "redirect"|"challenge"|"complete", redirect_url?,
challenge_id?}`.
- `POST /auth/complete` `{provider, …}` — requires an active session;
  binds that session to the user. Password: `{provider:"password",
username, password}`.
- `POST /auth/register` `{provider, …}` — public (no session, by
  necessity on a fresh install). The first account is admin; the
  password provider still requires username `admin`. Afterwards
  registration is closed unless `CODERPUZZLE_AUTH_REGISTRATION=open`.
- `GET /auth/callback/{provider}` — OAuth/OIDC return; 303 to `/`.
- `POST /auth/logout` — unbinds the user from the session.
- Compatibility: `POST /auth/login {username, password}` and register
  without `provider` still mean the password provider.

### Problems

```sh
# Full list (single page — the editor needs the whole ordering)
curl -b jar.txt $BASE/problems

# Paginated slice for lists
curl -b jar.txt "$BASE/problems?page=2&page_size=50"
```

Response page shape: `{items, total, page, page_size, pages}`; each item is
`{id, slug, title, difficulty, tags, topics, type}` (difficulty is one of
`Easy`, `Medium`, `Hard`, mirrored from the curated source). `page_size=0`
means all.

```sh
# One problem with statement, hints, invocation, limits, languages,
# starters, and public cases (inputs only — expected values are hidden)
curl -b jar.txt $BASE/problems/pair-sum
```

- `GET /problems/topics` → `{"topics": [{"name", "count"}…]}` — topic
  taxonomy with per-topic counts, busiest first.
- `GET /problems/{slug}/figures/{figure}` — an SVG from the bundle's
  `figures/`.
- `GET /problems/{slug}/solutions` — the solutions tab: `titles`,
  per-variant `implementations` by language, the `canonical` code, the
  worst-to-best `order`, and which variant is the `reference`. 404 when
  the bundle publishes none.

`invocation` describes the judge contract: parameter names/types (the full
kind vocabulary — 25 kinds including `nary_tree`, `quad_tree`, `nested`,
`graph`, `doubly_list`, and `json` — is the table in
[CODECS.md](CODECS.md)), the return type, and `comparison` — `exact`,
`sorted`, `multiset`, `set`, or `close` (floats compared per-scalar within
1e-9 relative tolerance; `{"mode":"close","tolerance":…}` customizes it in
the problem source). For `type: "design"` problems, cases carry
LeetCode-style `actions`/`params` sequences instead of a positional
argument list.

### Drafts (session-scoped editor state)

```sh
curl -b jar.txt $BASE/drafts/pair-sum
# [{"language":"python3","code":"…","updated_at":1786790973.5}]

curl -b jar.txt -X PUT $BASE/drafts/pair-sum/python3 \
  -H 'content-type: application/json' -d '{"code":"class Solution:\n    …"}'
```

A draft is at most 256 KiB.

### `POST /format` — the tri-state contract

Shared implementation with the CLI (same `runner/formatters.py`, same
pinned toolchain). Always 200 when the runner is reachable — the payload
carries the state:

```sh
curl -b jar.txt -X POST $BASE/format \
  -H 'content-type: application/json' \
  -d '{"language":"python3","code":"…"}'
```

| status        | meaning                              | extra field   |
| ------------- | ------------------------------------ | ------------- |
| `formatted`   | already conforming                   | —             |
| `unformatted` | parses; this is the formatted text   | `code`        |
| `error`       | does not parse (the author's to fix) | `diagnostics` |

`503` stays reserved for the runner being unreachable.

### Run (visible cases only)

```sh
curl -b jar.txt -X POST $BASE/run \
  -H 'content-type: application/json' \
  -d '{"slug":"pair-sum","language":"python3","code":"…"}'
```

Omit `cases` to run the problem's public cases (at most 20). Pass `cases`
(a list of `{parameter: value}` objects) to run custom inputs; custom cases
execute without an assertion and return the actual output. Response:

```json
{
  "status": "accepted",
  "passed": 3, "total": 3, "runtime_ms": 128,
  "results": [
    {"name":"Case 1","status":"accepted","input":{…},"actual":[0,1]}
  ]
}
```

### Submit (full judge)

```sh
curl -b jar.txt -X POST $BASE/submit \
  -H 'content-type: application/json' \
  -d '{"slug":"pair-sum","language":"python3","code":"…"}'
```

A job judges at most `CODERPUZZLE_MAX_JUDGED_CASES` cases (default 200) —
every case runs in its own sandboxed process, so a corpus generated into the
tens of thousands of cases would otherwise take hours. The subset is chosen
deterministically from the bundle's own case list: all public examples, the
largest inputs, then an even sample of the rest. `passed` and `total`
describe the cases that ran.

Judges every hidden case. Verdict statuses: `accepted`, `wrong_answer`,
`compile_error`, `runtime_error`, `time_limit_exceeded`,
`memory_limit_exceeded`, `system_error`. The response adds `submission_id`
and `reference_runtime_ms` (the bundle's designated reference solution on
the same runner; the ratio is a hardware-independent speed signal).

```sh
# Viewer's submission history for a problem (guest submissions are
# session-scoped and purged with the session; signed-in submissions are
# user-scoped and survive idle expiry)
curl -b jar.txt "$BASE/submissions?slug=pair-sum&limit=30"
curl -b jar.txt $BASE/submissions/42
```

`GET /progress` → `{slug: "solved" | "attempted"}` for the current viewer
(signed-in user or guest); solved when any submission in any language was
accepted, and absent slugs were never tried.

### Errors

`401` no/expired session · `400` unavailable language, malformed input,
unknown auth provider, or oversized draft · `403` registration closed
(default after the admin bootstrap; `CODERPUZZLE_AUTH_REGISTRATION=open`
reopens it) · `404` unknown problem/submission · `429` login or judge
throttle · `503` judge runner unavailable or busy. Error bodies are
`{"detail": "…"}`.

### Limits

Per-problem `limits` (`time_ms`, `memory_mb`, `output_kb`) ship in the
problem payload and are enforced inside the isolated runner; the API returns
verdict statuses rather than killing the HTTP request. Bodies over 256 KiB
are rejected at the web proxy.

### Execution timing profiles

Run/submit responses include `timing_mode` (`wall` or `cpu`) and
`resource_profile`. `runtime_ms` is the sum of testcase wall times in the
shared profile and CPU times in the isolated profile. Separate `wall_time_ms`
and (when available) `cpu_time_ms` aggregates exclude `queue_ms` and
`compile_ms`. The latter includes language preparation, not just native
compilation. These fields also apply to failures when measurements exist.

Public testcase results may include `cpu_time_ms`, `wall_time_ms`,
`memory_peak_bytes`, `cpu_throttled_ms`, `cpu_limit_ms`, `wall_limit_ms`,
`limit_mode`, and `timeout_reason` (`cpu` or `wall`). `timeout_ms` follows
`limit_mode`, which may be wall time for threaded problems even when runtime
is displayed as CPU time. Hidden per-case measurements remain private.

Stored submissions and history include timing mode/profile; migrated records
are `wall` / `shared-wall-v1`. Reference ratios are omitted across different
profiles or timing modes. Clients must not combine historical wall timing
and isolated CPU timing into a single benchmark series.

## Docker image CLI

The image installs the CLI as `coderpuzzle`; locally test an edited
`cli.py` by bind-mounting it over `/runner/cli.py`.

- `coderpuzzle format <files|dirs…>` — format in place to the CoderPuzzle
  standard; directories walk for formattable files, skipping
  `node_modules` and hidden trees.
    - `--check` — report unformatted files, change nothing, exit 1 if
      any. This is what CI runs over `problems/`.
    - `--report json` — non-mutating **tri-state JSON** per file (the
      same contract as `POST /format`, with `file` added):
      `formatted | unformatted (+ "code" text) | error
(+ "diagnostics")`. Exits 1 only when at least one file errored;
      "unformatted" is information, not a failure.
- `coderpuzzle gen-starters <problem.json> [--style modern|legacy]` — emit
  `starter.<ext>` for the languages the bundle already offers (the
  existing starter set is never widened), formatted by the pinned
  toolchain. `--style` defaults to `modern`; the provenance-aware
  choice (MAPPING.json-driven) lives in this repo's
  `scripts/gen_starters.py`. Requires this repo bind-mounted at `/tools`
  (the loader shim is the schema contract).
- `coderpuzzle judge <bundle-dir>` — judge **every** `solution*.<ext>` in
  the bundle through the real executors against **all** cases; all
  must pass every case. Assembles the bundle's own `provided/` sources
  exactly as a live judge job would. Compiles without the untrusted-
  submission sandbox (authoring on the author's own machine).
- `coderpuzzle run <file>` — the authoring fast loop: judge **one**
  solution file without running the whole bundle matrix.

### `coderpuzzle run <file>` — single-file runner with provided-discovery

- Walks up from the file to the directory holding `problem.json`
  (bundle discovery), so the file must live inside the bundle.
- Language comes from the extension (`--lang` overrides).
- Assembles `provided/<lang>/` exactly as `judge` does.
- **Sandbox boundary**: this is an authoring tool for the author's own
  machine, so it compiles plainly (as `judge` does); the _untrusted-
  submission_ sandbox applies to the REST `/run` path, not here.
- `--public` judges only the public cases (fast loop); default is all
  cases. Per-case verdicts print; exit 1 on any failure.

### Mount patterns

```bash
# authoring: format bundle files in place (checkout's cli.py wins)
docker run --rm --user 0:0 \
    -v "$PWD/runner/cli.py:/runner/cli.py:ro" \
    -v "$PWD/runner/formatters.py:/runner/formatters.py:ro" \
    -v "$PWD:/work" -w /work \
    ghcr.io/coderpuzzle/coderpuzzle:latest coderpuzzle format --check problems

# run one solution file against its bundle's cases
# (mount the repo root; the file is addressed from the working directory)
docker run --rm --user 0:0 \
    -v "$PWD/runner/cli.py:/runner/cli.py:ro" \
    -v "$PWD/runner/formatters.py:/runner/formatters.py:ro" \
    -v "$PWD:/work" -w /work \
    ghcr.io/coderpuzzle/coderpuzzle:latest coderpuzzle run problems/<shard>/<key>/my_draft.py
```

The convenience wrapper `scripts/format.sh` does the mounting for the
format case; `CODERPUZZLE_IMAGE` overrides the tag.
