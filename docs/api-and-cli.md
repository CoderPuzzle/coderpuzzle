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

Judges the hidden cases the job selects (bounded as above). Verdict
statuses: `accepted`, `wrong_answer`,
`compile_error`, `runtime_error`, `time_limit_exceeded`,
`memory_limit_exceeded`, `system_error`. The response adds `submission_id`
and `reference_runtime_ms` (this deployment's calibration figure for the
pair, measured once by the sweep rather than re-run per submission; the
ratio is a hardware-independent speed signal).

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
compilation. `algorithm_us` is the sum of in-harness spans around the
submission's own calls only (startup and compile excluded) and is the
numerator of `performance_ratio_percent` against the calibration field
`reference_algorithm_us`. These fields also apply to failures when
measurements exist.

Public testcase results may include `cpu_time_ms`, `wall_time_ms`,
`memory_peak_bytes`, `cpu_throttled_ms`, `cpu_limit_ms`, `wall_limit_ms`,
`limit_mode`, and `timeout_reason` (`cpu` or `wall`). `timeout_ms` follows
`limit_mode`, which may be wall time for threaded problems even when runtime
is displayed as CPU time. Hidden per-case measurements remain private.

Stored submissions and history include timing mode/profile; migrated records
are `wall` / `shared-wall-v1`. Reference ratios are omitted across different
profiles or timing modes. Clients must not combine historical wall timing
and isolated CPU timing into a single benchmark series.

### Per-case deadline (2026-09-21)

The judge enforces one deadline per case, `per_case_timeout_ms`
(`api/app/judge.py`) — the wall-clock kill the runner arms before the
submission runs. It **must** stay wall-clock at enforcement time: the
supervisor arms it before the submission's process starts, and
`algorithm_us` is only known once the harness measures the timed region and
reports it back — a hang, or heavy work placed outside that region (module
import, a "function" kind's constructor call, a compiled language's static
initializer), would never report anything for the deadline to react to. A
deadline that could only fire once `algorithm_us` arrives would let exactly
that class of submission run unbounded.

Within that constraint, the deadline is split into two terms so a slower
_algorithm_ is judged on its own, separately from the fixed cost every
submission pays regardless of algorithm quality:

    deadline = OVERHEAD_HEADROOM_MULTIPLE × overhead_ms
             + PER_CASE_REFERENCE_MULTIPLE × average_algorithm_ms

- `overhead_ms` is `wall_basis_ms − average_algorithm_ms` — the reference's
  own wall time (long-tail protected the same way as before, via
  `slowest_case_ms`) minus what its algorithm accounted for. This is
  interpreter/JVM boot, argument decode, and result encode: every submission
  pays it independent of how good its algorithm is, so it gets its own,
  smaller headroom (`OVERHEAD_HEADROOM_MULTIPLE`, default 3×) rather than
  `PER_CASE_REFERENCE_MULTIPLE` (10×).
- `average_algorithm_ms` is the reference's `reference_algorithm_us` divided
  by its case count — the part a slower algorithm should actually be judged
  against, at the full `PER_CASE_REFERENCE_MULTIPLE`.

Before this split, one wall-clock multiplier covered both terms, so a pair
where fixed overhead dominates wall time (most of the interpreted-language
corpus — the reference's own algorithm routinely accounts for under 1% of
its wall time) tolerated a submission whose algorithm was far more than
`PER_CASE_REFERENCE_MULTIPLE` times worse than the reference, as long as its
_total_ time stayed under the wall-derived ceiling. The split closes that
gap without touching the deadlines of algorithm-dominated pairs, where the
two formulas land close together by construction.

A record with no `reference_algorithm_us` (not yet re-measured under
algorithm timing) falls back to the pre-split, wall-only formula unchanged.

**Known gap, tracked in `TODO.md`**: the formula above uses only the
_average_ algorithm time per case; unlike `slowest_case_ms` for wall time,
the sweep does not yet keep the reference's single heaviest case's
algorithm contribution separately (it sums `algorithm_us` across cases and
discards the per-case figures). A bundle whose scaled cases vary widely in
size can therefore be under-protected on its single heaviest case — the
wall-time long tail still bounds the deadline from below via
`slowest_case_ms`, so it never regresses under the pre-split formula, but it
is not yet as tight as it could be. Fixing this needs a `calibrate.py`
change (record `slowest_case_algorithm_us`, mirroring `slowest_case_ms`) and
one full re-sweep of both trees to populate it.

### Algorithm repeat count (design settled 2026-09-22, implemented 2026-09-22)

17.3% of the corpus (4,450 of 25,790 pairs as measured 2026-09-21, cpp/go/rust
dominant) reads `below_floor` honestly — the reference's algorithm genuinely
finishes in single-digit-to-low-hundreds of microseconds, and for problems
whose stated bound is itself small (LC 10's `s.length, p.length <= 20` is the
motivating case: the difficulty is the recursion, not the input size), no
amount of Phase-5-style case scaling can raise that. `TODO.md` tracks the
remaining follow-up (the full corpus sweep that actually populates
`algorithm_repeat_count` for these pairs, plus LC 10's own re-calibration);
this section is the design the mechanism implements against, so a future
change can be checked against the reasoning instead of just the numbers.

**Field names, as shipped**: the calibration record gains
`algorithm_repeat_count` (int, only written when > 1 — an absent field or a
record from before this mechanism existed both mean 1, today's single-call
behavior). The harness reads the count from a new environment variable,
`CODERPUZZLE_REPEAT` (a string of the int; `worker.py`'s `_run_case` sets it
from `limits["algorithm_repeat_count"]`, defaulting to `"1"`), which
`main.py`'s `_run_judge` folds into `limits` from the calibration record
exactly like `time_ms` already is. No change to `judge.py`: `limits` was
already forwarded into `body["limits"]` untouched.

**Scope, as shipped**: function-kind only (`calibrate.py`'s
`ALGORITHM_REPEAT_KINDS = {"function"}`) — design/interactive/concurrent
have zero base timing instrumentation in cpp/go/rust/js/ts today, and are
only 0.25% of below-floor pairs, not worth building that instrumentation
for first. Also excluded (`ALGORITHM_REPEAT_UNSAFE_PARAMETER_KINDS`): every
wire-linked pointer kind (`linked_list`, `binary_tree`, `graph`,
`random_list`, ... — a shallow copy can't undo node-level mutation) and
`struct` (a bundle-provided `provided/<lang>/*` type isn't guaranteed to be
cloneable in every language). Together these are 8.8% + a handful of the
below-floor slugs; `_repeat_eligible(problem)` in `calibrate.py` is the
single gate.

**Mechanism**: repeat a judged case's timed call N times back-to-back inside
the harness's existing measurement bracket, and report the total as that
case's `algorithm_us` — a microbenchmark-style repeat-and-divide. Not a warm
process pool (see Execution timing profiles above and TRUST-BOUNDARIES.md —
the sandbox's per-case privilege drop and `_kill_lingering_children()` sweep
assume a process is used once; reusing one across submissions would also
leak state a submission can set, such as a global monkey-patch, into the
next submission that happens to land on the same process).

**N is per (slug, language), not a fixed count per language.** A fixed
count — cpp always 20x, say — would either overshoot pairs already close to
the floor (every later submission on that pair pays the extra repeats
forever, for no benefit) or undershoot the genuinely fastest ones. N is
instead discovered once per pair at calibration time and stored in the
record, the same way `reference_algorithm_us` and `timeout_ms` already are,
and replayed identically at submission judge time so the ratio and the
deadline stay comparable.

**Target and cap, derived from the corpus's own below-floor distribution**
(not chosen arbitrarily): repeat until the total clears **2000us** — 10x the
200us floor itself, not just past it, so the ratio has real margin against
the measurement noise already documented above (shared-mode CPU contention
dominates a single microsecond-scale case). Cap **N at 1000**: at that cap,
96.8% of the corpus's below-floor pairs fully clear the target, and raising
the cap further costs almost nothing to try since a pair needing a large N
is, by construction, one with a tiny per-call cost — the worst-case added
latency any cap produces is self-limiting to within ~2.2ms of the 2000us
target, whether the cap is 200 or 2000. The remaining ~3.2% (all measured at
exactly 1us on a single-shot reading — plausibly under the timer's real
resolution rather than a genuine value) are left honestly `below_floor`
rather than justify raising the cap for a number that's likely an artifact.

**Compiler dead-code elimination, solved per language, verified empirically
not assumed.** An optimizing compiler (cpp especially) can prove a pure
function called N times with unchanged arguments has no observable effect
beyond its return value, and legally hoist the whole repeat loop down to a
single call — silently breaking the mechanism for exactly the pairs it
exists to fix, producing a wrong number with no error. Every compiled/JIT
language got its own barrier and was verified by actually compiling a
throwaway solution and confirming `algorithm_us` scales with
`CODERPUZZLE_REPEAT`, not by reading the generated source and assuming it
would: cpp uses a `coderpuzzle_keep_alive<T>` template
(`asm volatile("" : : "g"(&value) : "memory")`, Google-Benchmark-style); go
assigns into a package-level `var coderpuzzleRepeatSink any` (the same
technique `testing.B` benchmarks use); rust uses `std::hint::black_box`
(stable); java assigns into a `private static volatile Object
coderpuzzleRepeatSink` field; js/ts (V8 is JIT, not AOT — elision risk is
lower but was still verified, not assumed) assign into a module-level `let
coderpuzzleRepeatSink`.

**Correctness stays anchored to the first call.** The comparison against
`expected` reads only the first repeat's result; every repeat after it
exists purely to accumulate timing signal. A mutating solution (in-place
sort, in-place rotate, ...) gets a fresh copy of the input before each
repeat, taken **outside** the timed bracket — inside it, the copy's own cost
would be misattributed as algorithm time. This is per-language: python
`copy.deepcopy`; cpp plain `=` (value-semantic `std::vector`); go
`encoding/json` marshal/unmarshal round-trip (plain `:=` only copies the
slice header — an aliasing bug caught before shipping); rust `.clone()`
taken once into a pristine binding before the first (moving) call, then
cloned fresh from that pristine binding into its own local ahead of every
repeat's timed span, never inline in the call expression itself (an inline
`.clone()` sits between the mark and the elapsed-read and gets its own cost
counted as algorithm time — a real bug here, caught empirically via
non-linear `algorithm_us` scaling and fixed); java re-decodes each
parameter fresh from the still-pristine raw JSON input via the existing
decode pipeline; js/ts `structuredClone()`, with the same
clone-must-happen-before-the-timed-span discipline as rust (js's generator
had the identical inline-clone bug, caught and fixed at the same time).

**`slowest_case_algorithm_us` (the per-case-deadline long-tail fix above) is
measured under this same N** — one calibration pass and one new field
family will serve both TODO items once that fix itself lands (still
tracked separately in `TODO.md`; not part of this mechanism's first cut).

**Scope, as shipped**: `calibrate.py` (the N-discovery loop — measure at
N=1, and if the pair is function-kind, eligible, and still below the 2000us
target, compute `n = min(1000, ceil(2000 / measured))` and remeasure,
bounded to a few rounds), the two plumbing sites (`main.py`'s `_run_judge`,
`worker.py`'s `_run_case`), and every function-kind harness: python, cpp,
go, rust, java, js, ts. `judge.py`'s `per_case_timeout_ms` needed no formula
change — it already divides `reference_algorithm_us` by case count, never
by count × N, so an N-times-larger reference auto-scales the deadline
correctly; a doc comment there records the invariant this depends on (the
same N must produce both the reference's and a submission's own
`algorithm_us`, which holds structurally since both read
`algorithm_repeat_count` from the one calibration record). Design,
interactive, concurrent, sql, and shell are explicitly out of scope for
this first cut (see above). Still pending: the full corpus sweep of both
trees that actually populates `algorithm_repeat_count` for the eligible
below-floor pairs — until that sweep runs, every existing calibration
record still reads 1 (today's behavior), even though the mechanism itself
is live.

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
