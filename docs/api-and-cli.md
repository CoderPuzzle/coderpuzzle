# OpenOJ REST API and docker image CLI

One toolchain, two interfaces. The runner image (`ghcr.io/zydo/openoj`)
carries every pinned language tool and executor; the REST API drives the
web UI, and the `openoj` CLI (installed in the image as `ojcli` from
`runner/cli.py`) drives authoring and CI. Formatting is the same code in
both — see the tri-state contract below.

Sessions are cookie-based. Every endpoint except `/health` and
`/auth/*` requires an `openoj_session` cookie from `POST /session`;
authenticated callers additionally carry the session of a signed-in
user. Errors are FastAPI payloads: `{"detail": "<reason>"}` with the
appropriate status (400 user error, 401 no/invalid session, 404 unknown
slug or submission, 503 runner unavailable).

## REST API

### Health & session

- `GET /health` → `{"status": "ok"}` — liveness; no session needed.
- `POST /session` — create a guest session; sets the `openoj_session`
  cookie. → `{"status": "active", "idle_seconds": 3600}`.
- `GET /session?touch=0|1` — validate the session. `touch=0` validates
  **without** extending the idle clock (the frontend's inactivity
  watcher probes with it, so watching cannot keep an abandoned session
  alive). → `{"status": "active", "idle_seconds", "user": null |
  {"username", "is_admin"}}`; 401 when expired or absent.

### Auth (backend; the UI is guest-only for now)

- `GET /auth/status` → `{"needs_setup": bool}` — public; true until the
  first account exists.
- `POST /auth/register` `{username, password}` — the very first account
  must be username `admin` (bootstrap); afterwards registration is
  closed. Password ≥ 8 chars.
- `POST /auth/login` `{username, password}` → sets the session cookie
  to the authenticated session.
- `POST /auth/logout` — ends the session.

### Problems

- `GET /problems?page=1&page_size=0` — paged summaries (id, slug,
  title, difficulty, tags, topics, …). `page_size=0` means all.
- `GET /problems/topics` → `{"topics": [{"name", "count"}…]}` — topic
  taxonomy with per-topic counts, busiest first.
- `GET /problems/{slug}` — the full public problem: statement pieces,
  constraints, examples, starter per offered language, `provided`
  assembly presence, public cases.
- `GET /problems/{slug}/solutions` — the solution guide: `titles`,
  per-variant `implementations` by language, the `canonical` code, the
  worst-to-best `order`, and which variant is the `reference`.
- `GET /problems/{slug}/figures/{figure}` — an SVG from the bundle's
  `figures/`.

### Drafts, judging, submissions, progress

- `GET /drafts/{slug}` — the caller's saved per-language drafts for the
  problem.
- `PUT /drafts/{slug}/{language}` `{code}` — save one draft (≤ 256 KB).
- `POST /format` `{language, code}` — **tri-state** (see below).
- `POST /run` `{slug, language, code, cases?}` — run against the given
  cases (defaults to the bundle's public cases; ≤ 20). → `JudgeResult`:
  `{status, passed, total, runtime_ms, results: [per-case verdicts]}`.
- `POST /submit` `{slug, language, code}` — judged against **all**
  cases; the runtime is also measured against the designated reference
  solution (`reference_runtime_ms`); the attempt is stored.
- `GET /submissions?slug=…&limit=30` — the caller's stored attempts.
- `GET /submissions/{id}` — one stored attempt (404 if not the
  caller's).
- `GET /progress` → `{slug: "solved" | "attempted"}` — solved when any
  submission in any language was accepted; absent slugs are
  never-tried.

### `POST /format` — the tri-state contract

Shared implementation with the CLI (same `runner/formatters.py`, same
pinned toolchain). Always 200 when the runner is reachable — the
payload carries the state:

| status | meaning | extra field |
|---|---|---|
| `formatted` | already conforming | — |
| `unformatted` | parses; this is the formatted text | `code` |
| `error` | does not parse (the author's to fix) | `diagnostics` |

`503` stays reserved for the runner being unreachable.

## Docker image CLI

The image installs the CLI as `openoj` (`ojcli` historically); locally
test an edited `cli.py` by bind-mounting it over `/runner/cli.py`.

- `openoj format <files|dirs…>` — format in place to the OpenOJ
  standard; directories walk for formattable files.
  - `--check` — report unformatted files, change nothing, exit 1 if
    any. This is what CI runs over `problems-adapt`.
  - `--report json` — non-mutating **tri-state JSON** per file (same
    contract as `POST /format`, with `file` added):
    `formatted | unformatted (+ "formatted" text) | error
    (+ "diagnostics")`. Exits 1 only when at least one file errored;
    "unformatted" is information, not a failure.
- `openoj gen-starters <problem.json> [--style modern|legacy]` — emit
  every `starter.<ext>` the bundle's invocation offers. Requires the
  problems repo bind-mounted at `/tools` (the loader shim is the
  schema contract).
- `openoj judge <bundle-dir>` — judge **every** `solution*.<ext>` in
  the bundle through the real executors against **all** cases; all
  must pass every case. Assembles the bundle's own `provided/` sources
  exactly as a live judge job would. Compiles without the untrusted-
  submission sandbox (authoring on the author's own machine).

### `openoj run <file>` — single-file runner with provided-discovery

The authoring fast loop: judge **one** solution file without running
the whole bundle matrix.

- Walks up from the file to the directory holding `problem.json`
  (bundle discovery), so the file must live inside the bundle.
- Language comes from the extension (`--lang` overrides).
- Assembles `provided/<lang>/` exactly as `judge` does.
- **Sandbox boundary**: this is an authoring tool for the author's own
  machine, so it compiles plainly (as `judge` does); the *untrusted-
  submission* sandbox applies to the REST `/run` path, not here.
- `--public` judges only the public cases (fast loop); default is all
  cases. Per-case verdicts print; exit 1 on any failure.

### Mount patterns

```bash
# authoring: format bundle files in place (checkout's cli.py wins)
docker run --rm --user 0:0 \
    -v "$PWD/runner/cli.py:/runner/cli.py:ro" \
    -v "$PWD/runner/formatters.py:/runner/formatters.py:ro" \
    -v "$PWD:/work" -w /work \
    ghcr.io/zydo/openoj:latest openoj format --check problems-adapt

# run one solution file against its bundle's cases
docker run --rm --user 0:0 \
    -v "$PWD/runner/cli.py:/runner/cli.py:ro" \
    -v "$PWD/runner/formatters.py:/runner/formatters.py:ro" \
    -v "$(dirname /path/to/bundle)/:/problems" -w /problems \
    ghcr.io/zydo/openoj:latest openoj run problems-adapt/<shard>/<key>/my_draft.py
```

The convenience wrapper `scripts/format.sh` (openoj repo) does the
mounting for the format case; `OPENOJ_IMAGE` overrides the tag.
