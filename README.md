# CoderPuzzle

CoderPuzzle is a containerized coding judge with a LeetCode-style
class-and-method workflow. It runs untrusted Python 3.14.7, Java 21.0.12,
C++20 with G++ 14.2.0, TypeScript 5.7.3 on Node 22.23.2, JavaScript on
Node 22.23.2, Go 1.24.4, and Rust 1.85.0 submissions, keeps problem packages
outside the application images, and persists submission history in a Docker
volume.

The REST API and the image's authoring CLIs are documented in
[docs/api-and-cli.md](docs/api-and-cli.md) — one toolchain, two interfaces:
the tri-state `/format` endpoint and the `coderpuzzle format|gen-starters|judge|run` CLI.

## Start it

```bash
docker compose up --build
```

Open <http://localhost:8081>. Set `CODERPUZZLE_PORT` to publish another port:

```bash
CODERPUZZLE_PORT=9090 docker compose up --build
```

Judging additionally needs a deployment-local calibration file, and the compose
default is `CODERPUZZLE_REQUIRE_CALIBRATION=1`: until one is published,
registration, login, and judging return `503`, while browsing problems and
reading statements is unaffected. For a quick local spin, drop the requirement:

```bash
CODERPUZZLE_REQUIRE_CALIBRATION=0 docker compose up --build
```

For a real deployment, build the calibration instead — `python -m app.calibrate`
inside the API image sweeps every problem × language pair and atomically
publishes `/calibration/calibration.json` ([Judge
resources](docs/JUDGE-RESOURCES.md)).

The editor uses Monaco's language services and local worker bundles, so grammar
highlighting, bracket matching, and indentation guides do not depend on a CDN.
The first visit follows the operating system's light/dark preference; the
header toggle saves an explicit browser-local override. Visitors work in
ephemeral guest sessions: editor drafts are stored server-side per session
and survive refreshes, and both drafts and submission history are scoped to
the session (idle-expiring after an hour). Accounts keep that history
under the user id. Sign-in is a provider catalog (username and password
today; OAuth, OpenID, and email OTP plug in without new routes — see
[docs/AUTH.md](docs/AUTH.md)). Submission records persist in the
`coderpuzzle_data` volume.

## Problem packages

Problems come in two package formats, and both may coexist in one directory:
the canonical **split format** (one directory per problem) and the legacy
**flat format** (one `<zero-padded id>_<slug>.md` document per problem). This
repository tracks the complete 4,031-bundle original-source set in the split
format directly under `problems/`:

```text
problems/
└── 0001-0100/            id-range shards of 100
    └── 0001_two-sum/
        ├── problem.json  metadata, invocation schema, limits
        ├── cases.json    testcase corpus ({public, hidden} display grouping)
        ├── statement.md  pure-prose statement with a fixed heading grammar
        ├── starter.<ext> generated from problem.json — never handcrafted
        ├── provided/<lang>/
        │                 the bundle's own oracle and helper sources
        └── solution.<ext>
                          canonical solution; a `solution_<variant>.<ext>`
                          carries a genuinely distinct alternative that
                          solutions.md documents
```

The split format's statement grammar is `# <Title>`, a required
`## Description` with `### Example N` and `### Constraints` (optional for SQL
problems), and optional `## Hints` with `### Hint N` headings — the
authoritative bundle reference is [docs/FORMAT.md](docs/FORMAT.md), including
the `reference_solution` designation and the worst-to-best ordering of the
alternative solutions.

A flat document is self-contained, and is the language-agnostic source of
truth for the problem statement, hints, LeetCode-style invocation, ordered
parameters and codecs, comparison strategy, resource limits, adapters,
starters, and testcase corpus. Every document must contain these level-two
headings exactly once and in this order:

```text
# <id>. <title>
## Metadata
## Description
## Hints
## Invocation
## Limits
## Languages
## Starters
## Test Cases
```

`Metadata`, `Hints`, `Invocation`, `Limits`, and `Languages` each contain one
fenced `json` block. `Starters` contains one `### <language key>` heading and
one code fence for every language, in the same order as `Languages`. `Test
Cases` contains ordered `### Public` and `### Hidden` headings, each with one
JSON array of `{input, expected}` objects. Missing, duplicated, unknown, or
reordered schema headings are rejected instead of being guessed. Function
inputs use positional argument arrays (`[[2,7,11,15], 9]` for Two Sum).
Design problems use `{"actions": [...], "params": [...]}` sequences.

## Selecting a problem set

**A problem set is always a directory on disk.** The app fetches nothing:
there is no remote problem set, no clone, no cache. `./problems` in this
repo is the problem set, bind mounted read-only into the `api` container at
`/problems`.

To serve a different tree, point the bind mount at it — no image rebuild:

```bash
docker compose up --build                                            # default: ./problems
CODERPUZZLE_PROBLEMS_PATH=/absolute/path/to/other-set docker compose up --build
```

`CODERPUZZLE_PROBLEMS_PATH` is the host path to bind; `CODERPUZZLE_PROBLEMS`
is the path the app reads _inside_ the container and is already set to
`/problems` by compose. Running the API outside compose, set
`CODERPUZZLE_PROBLEMS` to the directory directly:

```bash
CODERPUZZLE_PROBLEMS=/srv/problem-sets/lc uvicorn app.main:app
```

The path must name an existing directory and it is the package root — the
directory whose children are the id-range shards. Anything else (a GitHub
`owner/name`, a git URL, a missing path) is a startup error rather than
something the app goes and fetches.

The adapted problem set lives in the private `CoderPuzzle/lc-adapt`
repository as its `problems/` directory. Clone it wherever you like and
point `CODERPUZZLE_PROBLEMS_PATH` at that directory; getting a problem set
onto a host is an explicit operator step, not something the service does at
startup.

Static-language function wrappers use the same neutral `value_type` shapes on
parameters and return values. The full kind vocabulary — 25 kinds including
`nary_tree`, `quad_tree`, `nested`, `graph`, `doubly_list`, and `json` — is
documented in [docs/CODECS.md](docs/CODECS.md). The API never sends expected
values to the runner; executor plugins encode testcase inputs into a typed
binary stream and serialize only the submitted function's result back to
JSON.

The API renders only `## Description`; schema data, starters, and testcases do
not cross into the problem pane. Starter templates are neither global nor
standalone source files. Enabled templates use explicit not-implemented
statements so extracted skeletons remain syntactically valid before a user
fills them in.

The runner is language-pluggable. Each executor implements a small interface
that prepares or compiles source, returns the per-test command/environment, and
encodes the neutral testcase payload. Sandboxing, queueing, verdicts, storage,
and the HTTP API remain language-independent.

Per-language input/output codecs cover the well-known wire kinds;
[docs/CODECS.md](docs/CODECS.md) is the authoritative kind-to-class table.
The judge owns no class definitions of its own — it assembles only the
bundle's own `provided/<lang>/` sources with a submission, and no shared or
fallback definitions exist anywhere. Compiled languages (C++, Java,
TypeScript, Go, Rust) compile once per submission, then start a fresh
process for each testcase; JavaScript runs its generated wrapper on Node
without a compile step.

SQL problems are judged against SQLite. The invocation carries the schema
DDL in `sql.schema`, and each testcase's `input` array carries the setup
statements — the harness runs `input[0]` to seed the tables — with the
query's rows returned for row-set or exact-order comparison. Queries may
be multi-statement for dynamic-columns problems (a discovery `SELECT`
substitutes its column list into the statements that follow;
docs/CODECS.md has the details). SQL problems list only `SQL` in their
languages block, so the editor's language selector shows SQL alone, and
non-SQL problems never offer it.

Shell problems are bash scripts judged as text filters. Each testcase's raw
file text is fed on stdin; the script's stdout (without trailing newlines) is
compared with a string expected value. Nonzero exits and output past the
problem's limit are runtime errors. A shell bundle lists only `Shell` via its
`starter.sh`, and the editor uses Monaco's built-in shell grammar.

In the default shared profile the runner benchmarks every executor at startup,
which is what scales each language's `time_ms` deadline to the host (see
[Judging and time limits](#judging-and-time-limits)). A background thread
pre-warms and periodically re-warms the compilers
(rustc, g++, go build, javac, tsc) by building throwaway programs. This reduces
cold compile costs. Go additionally shares one persistent build cache across
submissions so its standard library is compiled once per container, not once
per job.

The checked-in tree is the complete 4,031-bundle original-source corpus. The
copyright-free adaptation is maintained separately in the private `lc-adapt`
repository and can be selected by its local directory path. Difficulty labels
(Easy/Medium/Hard) mirror the source, and every testcase's expected value was
produced by running a reference solution.

## Judging and time limits

Each testcase runs in its own sandboxed process, so a job's wall time is set
by the size of its case list rather than by the submission's own runtime. A
bundle whose corpus was generated into the tens of thousands of cases would
otherwise take hours, so a job judges at most `CODERPUZZLE_MAX_JUDGED_CASES`
cases (default 200): the bundle's public examples, its largest inputs, and an
even sample of the rest, chosen deterministically so a submission, its
calibration record, and any later re-judge agree. The runner wait scales with
the cases actually sent.

The default shared profile uses `time_ms` as a nominal per-testcase deadline. At runner startup,
each executor runs a deterministic language-specific benchmark. The runner
scales that language's deadline by its score and clamps the factor to
`0.75x–3.0x`, keeping results reasonable across different machines without
allowing an arbitrarily slow host to disable the limit.

Both wall-clock and CPU limits are enforced. An infinite loop is killed as a
process group, remaining cases are skipped, and any processes left behind by a
submission UID are terminated. Memory, process count, open files, output size,
and core dumps are limited independently.

### Isolated resource profile

For comparable execution measurements, use the Linux isolated profile in
[Judge resources](docs/JUDGE-RESOURCES.md). It adds host-reserved whole CPU
cores, separate control and execution budgets, a fresh cgroup per testcase,
aggregate CPU accounting, swap prohibition and whole-group cleanup. Extra
submissions queue behind fixed execution slots. CPU quotas alone do not
reserve cores; the default Compose file remains the shared development mode.

The isolated profile reports `runtime_ms` as CPU time, with separate wall,
queue and compilation times. Ordinary algorithms use a fixed CPU budget and
an independent wall backstop; threaded problems retain their wall deadline.
API responses and stored history identify the timing mode and resource
profile. Old records retain wall-time semantics. Isolation substantially
reduces interference, but does not guarantee identical elapsed milliseconds.

### Reference-relative timing

Absolute milliseconds mean nothing across machines, so accepted submissions
are also compared against the problem's built-in reference. The baseline is
the deployment-local calibration record for that `(problem, language)` pair —
its `reference_walltime_ms`, measured once per pair by the calibration sweep
and stored in `/calibration/calibration.json`. The response carries
`reference_runtime_ms` alongside the user's `runtime_ms`, and the UI shows
the ratio ("162% of reference").

With `CODERPUZZLE_LEGACY_REFERENCE_TIMING=1` (which the local dev override
sets), an accepted submission instead re-runs the bundle's _designated_
reference — `reference_solution` in problem.json names the one file
(`solution.<ext>` or a `solution_<variant>.<ext>`), the optimal approach —
through the same resource profile, the same executor, and the same cases,
and uses that run as the baseline.

Either way the comparison is same-language by construction, indicative rather
than precise for very fast solutions, and best-effort: without a baseline,
without a bundled reference, or across differing resource profiles, the ratio
is simply omitted. Calibration also supplies each pair's `timeout_ms`.

Production requires a complete calibration file: with
`CODERPUZZLE_REQUIRE_CALIBRATION=1` (the compose default) registration, login,
and judging return `503` until one is published. Build or resume it with
`python -m app.calibrate` inside the API image — see
[Judge resources](docs/JUDGE-RESOURCES.md).

## Security boundary

The assertion system is deliberately outside the execution container:

- The API reads expected answers and compares results; expected data is never
  placed in a runner request.
- The runner container has no network namespace and does not mount problem or
  persistence volumes.
- Queue directories are inaccessible to the unprivileged submission UID.
- Every testcase starts a fresh isolated language process with a read-only root
  filesystem, a private scratch directory, dropped privileges, `no-new-privileges`,
  Docker resource limits, and POSIX rlimits.
- Hidden inputs, expected values, stdout, exception text, and per-case timing
  are never returned to the browser.
- The API and web containers do not receive the Docker socket.

The trusted runner supervisor starts as container UID 10000, not root. A
dedicated supervisor-only Python executable carries exactly `CHOWN`, `KILL`,
`SETUID`, `SETGID`, and `DAC_OVERRIDE`; the last capability exists only so it
can remove per-job trees created with hostile permissions. General Python does
not carry them. The supervisor has no network, writable root filesystem,
Docker socket, problem mount, or persistence mount.
Submission source is never imported into it. Before any hostile compiler or
runtime executes, the child changes to UID/GID 65534, explicitly empties its
permitted/effective/inheritable capability sets, and enables
`no-new-privileges`. The general `/tmp` remains `noexec`; compiled programs live
only in a per-job directory on an ephemeral executable tmpfs and are deleted
after the job.

Every compiler has independent CPU, address-space, file, descriptor, process,
and wall-clock limits. Java annotation processing and Go CGO/network module
resolution are disabled. The whole runner remains networkless, read-only, and
bounded by a 768 MB memory cgroup even where managed toolchains require a larger
virtual-address allowance.

Docker build arguments (base-image tags and npm installs) pin the Python,
Node, and TypeScript versions. The Debian packages (G++, Go, OpenJDK, Rust,
and libcap) are pinned by major package name only, so a package repository
change can still select a newer minor rather than failing the build.

This is defense in depth for hostile code, but ordinary Docker containers share
the host kernel. An internet-facing deployment should place the runner on a
dedicated disposable VM or node and add a stronger runtime such as gVisor,
Kata Containers, or Firecracker, plus ingress rate limits. That keeps a future
container-runtime or kernel escape away from the API and stored submissions.

## Data conventions

The JSON wire shapes for linked lists, trees, and design/interactive cases,
the typed binary stream the compiled-language wrappers read, and the
comparison modes are documented in [docs/CODECS.md](docs/CODECS.md).

## REST API

The judge's HTTP API (sessions, problems, drafts, format, run, submit,
submissions, progress) is available to scripted callers — see
[docs/api-and-cli.md](docs/api-and-cli.md) for every endpoint, the session
model, the error statuses, and the execution-timing fields.

## Persistence

SQLite data lives at `/data/coderpuzzle.sqlite3` in the `coderpuzzle_data` named volume.
Normal `docker compose down` and image rebuilds preserve it. The judge queue is
a separate transient volume and contains no expected answers.

## Verification

```bash
python3.14 -m pytest -q
cd frontend && npm run build && npm audit --omit=dev
docker compose config --quiet
```

The corpus gates run against a real toolchain. `scripts/format.sh` wraps the
runner image, which is the only place the pinned formatters live:

```bash
scripts/format.sh --check problems                       # canonical formatting
python3 scripts/check.py --tree problems --skip-runtime  # static bundle tier
CODERPUZZLE_PROBLEMS=problems python3 scripts/verify_solution.py <shard>/<key>
```

`verify_solution.py` judges a bundle's `solution*.<ext>` through the real
executors and expects the local toolchain on `PATH`; `check.py`'s static tier
compares starters byte-for-byte against the generator, so it belongs in the
image, where clang-format lives. [scripts/README.md](scripts/README.md) is
the tooling map — the authoring gates, the corpus consistency check, and the
headless-UI drivers. `.github/workflows/check-problems.yml` runs the static
tier on pushes that touch the corpus or the judge, and a sharded all-bundle
judge sweep on dispatch and weekly.
