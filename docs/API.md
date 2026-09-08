# CoderPuzzle REST API

The judge's full surface — the same API the web UI uses — available to
scripted callers. Everything except `/health`, `GET /auth/status`, and
`POST /auth/register` requires an active **session cookie**; `GET
/auth/status` reports whether the admin bootstrap has happened (public,
so the first-visit gate can render before any session exists).
Account endpoints exist for the gate (`POST /auth/register` bootstraps
the fixed-name `admin` on a fresh install and then closes — it needs no
session, necessarily; `POST /auth/login` binds the CALLER'S EXISTING
session to a user, whose drafts and submissions then live under the user
id; `POST /auth/logout` unbinds). Treat any deployment's API as public
and rate-limit at the edge if you expose it.

## Base URL

The API is served at the web UI's same origin, under `/api/`:
`https://coderpuzzle.dongziyu.com/api/…` (the edge terminating TLS lives outside
this repo; the plain-HTTP origin is the web service's published port, 8081
by default). Paths below assume this form.

## Sessions

A session is an HttpOnly cookie created on demand. It idles out after one
hour; an expired session and everything it owns (drafts, submissions) is
deleted.

```sh
# Create a session (keep the cookie jar)
curl -c jar.txt -X POST https://coderpuzzle.dongziyu.com/api/session
# {"status":"active","idle_seconds":3600}

# Check it
curl -b jar.txt https://coderpuzzle.dongziyu.com/api/session

# Validate without extending the idle clock (the frontend's inactivity
# watcher probes with this — watching must not keep an abandoned session alive)
curl -b jar.txt 'https://coderpuzzle.dongziyu.com/api/session?touch=0'
```

Every request with a valid cookie refreshes the idle clock;
`GET /session?touch=0` is the one exception. A request without a valid
cookie gets `401 {"detail":"No active session"}`.

## Problems

```sh
# Full list (single page — the editor needs the whole ordering)
curl -b jar.txt 'https://coderpuzzle.dongziyu.com/api/problems'

# Paginated slice for lists
curl -b jar.txt 'https://coderpuzzle.dongziyu.com/api/problems?page=2&page_size=50'
```

Response page shape: `{items, total, page, page_size, pages}`; each item is
`{id, slug, title, difficulty, tags, topics, type}` (difficulty is one of
`Easy`, `Medium`, `Hard`, mirrored from the curated source).

```sh
# One problem with statement, hints, invocation, limits, languages,
# starters, and public cases (inputs only — expected values are hidden)
curl -b jar.txt https://coderpuzzle.dongziyu.com/api/problems/pair-sum
```

`invocation` describes the judge contract: parameter names/types (the full
kind vocabulary — 25 kinds including `nary_tree`, `quad_tree`, `nested`,
`graph`, `doubly_list`, and `json` — is the table in
[CODECS.md](CODECS.md)), the return type, and `comparison` — `exact`,
`sorted`, `multiset`, `set`, or `close` (floats compared per-scalar within
1e-9 relative tolerance; `{"mode":"close","tolerance":…}` customizes it in
the problem source). For `type: "design"` problems, cases carry
LeetCode-style `actions`/`params` sequences instead of a positional
argument list.

```sh
# A statement figure shipped with the bundle (SVG)
curl -b jar.txt https://coderpuzzle.dongziyu.com/api/problems/pair-sum/figures/sample-1.svg

# Solutions tab: per-variant explanations plus each variant's
# implementation in every offered language (404 when the bundle
# publishes none)
curl -b jar.txt https://coderpuzzle.dongziyu.com/api/problems/pair-sum/solutions
```

## Drafts (session-scoped editor state)

```sh
curl -b jar.txt https://coderpuzzle.dongziyu.com/api/drafts/pair-sum
# [{"language":"python3","code":"…","updated_at":1786790973.5}]

curl -b jar.txt -X PUT https://coderpuzzle.dongziyu.com/api/drafts/pair-sum/python3 \
  -H 'content-type: application/json' -d '{"code":"class Solution:\n    …"}'
```

## Format (editor toolchain)

```sh
curl -b jar.txt -X POST https://coderpuzzle.dongziyu.com/api/format \
  -H 'content-type: application/json' \
  -d '{"language":"python3","code":"…"}'
```

Tri-state — the payload carries the state, so the endpoint is `200`
whenever the runner is reachable:

- `{"status":"formatted"}` — the draft already conforms;
- `{"status":"unformatted","code":"…"}` — the draft parses; this is the
  formatted text, produced by the same pinned toolchain the problem
  bundles use;
- `{"status":"error","diagnostics":"…"}` — the draft does not parse (the
  author's to fix, so a payload state rather than a judge verdict);
  `503` remains reserved for the runner being unreachable.

## Run (visible cases only)

```sh
curl -b jar.txt -X POST https://coderpuzzle.dongziyu.com/api/run \
  -H 'content-type: application/json' \
  -d '{"slug":"pair-sum","language":"python3","code":"…"}'
```

Omit `cases` to run the problem's public cases. Pass `cases` (a list of
`{parameter: value}` objects) to run custom inputs; custom cases execute
without an assertion and return the actual output. Response:

```json
{
  "status": "accepted",
  "passed": 3, "total": 3, "runtime_ms": 128,
  "results": [
    {"name":"Case 1","status":"accepted","input":{…},"actual":[0,1]}
  ]
}
```

## Submit (full judge)

```sh
curl -b jar.txt -X POST https://coderpuzzle.dongziyu.com/api/submit \
  -H 'content-type: application/json' \
  -d '{"slug":"pair-sum","language":"python3","code":"…"}'
```

Judges every hidden case. Verdict statuses: `accepted`, `wrong_answer`,
`compile_error`, `runtime_error`, `time_limit_exceeded`,
`memory_limit_exceeded`, `system_error`. The response adds
`submission_id` and `reference_runtime_ms` (the bundle's reference solution
on the same runner; the ratio is a hardware-independent speed signal).

```sh
# Viewer's submission history for a problem (guest submissions are
# session-scoped and purged with the session; signed-in submissions are
# user-scoped and survive idle expiry)
curl -b jar.txt 'https://coderpuzzle.dongziyu.com/api/submissions?slug=pair-sum'
curl -b jar.txt https://coderpuzzle.dongziyu.com/api/submissions/42
```

## Progress (per-viewer marks)

```sh
# 'solved' / 'attempted' per problem for the current viewer (signed-in
# user or guest); absent slugs were never tried
curl -b jar.txt https://coderpuzzle.dongziyu.com/api/progress
```

## Errors

`401` no/expired session · `400` unavailable language, malformed input, or
oversized draft · `404` unknown problem/submission · `503` judge runner
unavailable. Error bodies are `{"detail": "…"}`.

## Limits

Per-problem `limits` (`time_ms`, `memory_mb`, `output_kb`) ship in the
problem payload and are enforced inside the isolated runner; the API returns
verdict statuses rather than killing the HTTP request. Bodies over 256 KiB
are rejected at the web proxy.
