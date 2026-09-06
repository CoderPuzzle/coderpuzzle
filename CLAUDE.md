# OpenOJ — judge infrastructure and problem bank

Two repos, deliberately decoupled:

- **openoj** (this repo) — the judge: FastAPI app, React frontend, runner
  image (`ghcr.io/zydo/openoj`), toolchain, docs. Knows nothing about any
  specific problem.
- **openoj-problems** (sibling `../openoj-problems`) — the problem bank:
  bundles, shared code, authoring tooling. Knows nothing about the judge
  except its published contract.

The bank's adapted tree is `problems-adapt/` — the merge of both adapted
corpora: 838 bettercode-derived bundles plus 3,193 extend-derived ones,
all carrying their **original source ids** (the bettercode set's 1–838
renumbering was reverted via `problems-adapt/MAPPING.json`). 13 ids have
one bundle from each provenance (distinct slugs);
`BETTERCODE-SUBSET.md` (bank root) lists the bettercode-derived ids and
`problems-adapt/MAPPING.md` is that subset's adaptation ledger.
`problems-originals/` merges the two originals trees — the bettercode
curated originals plus the verbatim lc-crawl extend originals (the 13
shared extend originals carry a `-crawl` slug suffix); it is not
CI-checked. Scrape origin: `~/code/lc-crawl` (raw) →
`~/code/bettercode` (curated) → `problems-originals/`.

**`problems` is a symlink** naming whichever tree the judge serves (the
app takes the repo's `problems/` subdirectory as its package root). It
points at `problems-originals` as of 2026-09-05. Everything else — CI,
the bank's `scripts/`, this repo's `scripts/verify_*.py` — addresses
`problems-adapt` by name and never goes through the symlink. The
originals became fully schema-2 serveable when the 838 bettercode-era
manifests were backfilled 2026-09-05 (`reference_solution` taken from
each bundle's problems-adapt twin, canonical `solution.*` meaning `""`);
flipping the symlink is the one-line switch between the two trees.

## Adaptation philosophy

Every problem is a **copyright-free, algorithm-identical adaptation** of a
curated LeetCode original: rewritten statements in the bank's own voice,
the source's own id kept (shard = `problems-adapt/0001-0100/`-style hundreds
buckets; the bettercode set's temporary 1–838 renumbering was reverted),
descriptive kebab slugs
(`0001_pair-sum`), restated examples/constraints. `difficulty` mirrors
the original source difficulty (Easy/Medium/Hard) in both trees — never
a re-evaluation; tags follow the bank's normalized scheme.

## Bundle format (openoj-problems/FORMAT.md is authoritative)

    problems-adapt/<shard>/<id>_<slug>/
      problem.json    schema_version, reference_solution,
                      id, slug, title, difficulty, tags, topics, type,
                      invocation, limits
      cases.json      public[] + hidden[], {"input": [...], "expected": ...}
      statement.md    '# Title', '## Description' (### Example N, Constraints)
      solutions.md    shared intro paragraph, then '## <Approach>' sections,
                      each ending '**Complexity:** `O(...)` time, `O(...)` space.'
      starter.<ext>   GENERATED from problem.json (gen_starters) — never hand-edit
      solution.<ext>  canonical solution (the reference when
                      reference_solution == "")
      solution_<variant>.<ext>   named alternative solutions
      provided/<lang>/   problem-specific sources assembled into every
                      submission: oracle/helper code (design and interactive
                      kinds) AND every well-known data structure the wire
                      needs (ListNode, TreeNode, ...) — self-contained,
                      copy-pasted from a sibling bundle, never a shared
                      library (docs/CODECS.md has the wire→class table)
      figures/*.svg   statement/solutions figures

Canonical JSON form (both repos, enforced by the image formatter):
`json.dumps(..., indent=2, ensure_ascii=False) + "\n"`, key order authorial.
Markdown is hand-wrapped (~75 col); code follows each language's pinned
formatter via the image.

## Self-contained problem code (no shared library)

- The judge owns no predefined data structures. Every well-known type a
  bundle's wire needs — `ListNode`, `TreeNode`, n-ary `Node`, and the
  rest of `docs/CODECS.md`'s wire→class table — is that bundle's own
  definition in `provided/<lang>/`, exactly like narrow types (`Node`
  for LC 133's graph, etc.) always were. This is deliberate: authors
  never search a shared library before writing a structure, two bundles
  using the same display name for structurally different shapes never
  collide, and every language's import story stays flat (a bundle's own
  files, nothing resolved from a repo-root package). Copy from a
  sibling bundle using the same kind — never hand-invent a shape, never
  share a definition across bundles.
- There is no `common_version` field and no shared-library version to
  track; `schema_version` alone versions the bundle format.
- `reference_solution` (required string) designates the ONE time-cost
  baseline: `""` = the canonical `solution.<ext>`, a variant slug =
  `solution_<variant>.<ext>`. It is always the optimal approach — the
  section the worst-to-best `solutions.md` ordering ends with. The judge
  runs exactly this reference (plus the submission) when scoring the
  time-cost percentage; the solutions page badges it.
- Trust model for bundle-carried code (`provided/`): see
  `docs/TRUST-BOUNDARIES.md` — it is problem-set content, trusted like
  cases.json, confined by the sandbox; assembly reads exactly one
  well-known directory and nothing else.

## Judge infrastructure (openoj/)

- `runner/` — executors for python3, java, cpp, go, rust, typescript,
  javascript (+sql, +shell), compiler/runtime privilege split
  (`compiler_sandbox.py`, `runtime_sandbox.py`), and the authoring CLI.
- **The judge protocol travels on fd 63; stdout is only a local-tooling
  fallback.** Anything that spawns harnesses outside the worker (local
  verify scripts) parses stdout instead.
- Runner image `ghcr.io/zydo/openoj` owns the pinned toolchain and
  **all formatting**: `runner/formatters.py` is the single formatting owner
  (markdown + canonical JSON + per-language code). The bank's
  `scripts/format.py` is only a loader shim; there is deliberately no
  local toolchain in openoj-problems.
- The app fetches the problem set from `zydo/openoj-problems` on start
  (cache under openoj `/.cache/problems/`), or serves a local path via
  `OPENOJ_PROBLEMS`. Restarting the stack picks up newly pushed problems.

## Core APIs and CLI

App (`api/app/`): `/problems`, `/problems/{slug}`, `/run`, `/submit`,
`/format`, `/drafts/*`, `/submissions*`, `/progress` (per-viewer solved/
attempted marks), `/session` (GET accepts `?touch=0` — validate without
extending the idle clock, used by the frontend's inactivity watcher),
`/auth/*`. Submit stores the attempt (code, verdicts, runtime, and the
reference runtime the time-cost % is measured against) under the viewer's
scope: `user:<id>` when signed in (survives idle expiry), the guest
session id otherwise (purged with the session). Idle expiry routes the
UI to a dedicated logged-out page.

CLI (inside the runner image): `openoj format <files>` (formats in place;
`--check` gates; `--report json` emits the non-mutating tri-state
formatted/unformatted(+text)/error(+diagnostics) per file — the same
contract as REST `POST /format`), `openoj gen-starters`,
`openoj judge <bundle>` (judges every `solution*.<ext>` through the real
executors, assembling the bundle's own `provided/` sources),
`openoj run <file>` (single-file fast loop: discovers the bundle upward,
infers the language, `--public` for public cases only; compiles plainly
like `judge` — authoring tool, not the untrusted-submission sandbox).
REST + CLI reference: `docs/api-and-cli.md`; the provided-code trust
stance (non-secret by construction) is documented in
`docs/TRUST-BOUNDARIES.md`. `scripts/format.sh` wraps the docker-run
invocation.

## Authoring and verification loop

1. Scrape/curate originals (lc-crawl → bettercode), archive into
   `problems-originals/`, adapt into a new bundle (statement, problem.json,
   cases, canonical solution in all 7 languages).
2. `scripts/gen_starters.py` regenerates starters from problem.json.
3. **Verify**: `python3 scripts/verify_solution.py problems-adapt/<shard>/<key>`
   (openoj repo's scripts/) — judges every solution in the bundle
   through the real executors. The key must be shard-qualified; a bare
   key resolves without the shard and fails.
4. **Check**: `python3 scripts/check.py` (bank repo) — static tier:
   problem.json exact key set, statement grammar, starter = generator
   output (needs clang-format, i.e. the image — locally this check false-
   positives on every starter.cpp), plus a judged runtime tier.
5. **Format**: run the pinned formatters in-image (see Environment below);
   hand-matched formatting is verified byte-exact this way.

## Multi-solution law

Solutions run **worst-to-best, optimal LAST**. The intro paragraph's
sentences mirror that order; section bodies move byte-identical on
reorder. Tie rule (equal complexity): naive/general first, refined/clever
last; a "(Follow-up)" variant always last. Variants must be **genuinely
distinct ideas, competitively priced** — similar constants, same or
comparable asymptotics (O(n) vs O(n log n) is the outer edge); no
brute-force fillers, no mechanical recursive↔iterative rewrites. The
statement's own hints often reveal the intended optimal — it closes the
file and carries the `reference_solution` designation.

Variant-wave process that worked (54 bundles, 378 files, all green):
curate candidates in chunked read-only agents (strict bar, statement-
verified, ranked) → author one bundle per agent (read exemplars
`0001_pair-sum` + FORMAT.md; author 7 languages mirroring the canonical
fragment shape; insert the section per the law; verify until green; no
formatters, no git) → on landing, hash-check the new files through the
in-image formatter (normalizes any whitespace drift) and re-verify.

There is no standing corpus-flags ledger — the retired `CORPUS-FLAGS.md`
(bank repo) was deleted 2026-09-04 with every item resolved; its history
is in git. Surface new contradictions to the user with evidence.

## Tooling map

- openoj `/scripts/` (tracked; see its README.md): the authoring gates
  (`verify_solution.py`, `verify_corpus.py`) and the headless-UI
  drivers (`stub-server.mjs`, `shot.mjs`, `session-e2e.mjs`). The
  gitignored `/.localonly/` holds only regenerable cache (the compiled
  Java harness).
- openoj-problems `/.localonly/`: empty scratch (see its README.md) —
  all authoring one-shots and the finished-wave `adapt_archive/`
  bookkeeping were deleted 2026-09-04 with the corpus complete.

## Fleet discipline (agent concurrency)

The completed adaptation program's state ledger `openoj-problems/.adapt/`
was deleted 2026-09-04 (corpus complete; history in git). If a future
fleet runs, recreate the ledger there and record every rate-limit event.
Two death classes: per-minute 429s (concurrency-driven —
step the target down, roughly halve, floor 4) vs 5-hour-pool exhaustion
(consumption-driven — do NOT step down; wait for the reset timestamp in
the error and resume). Prefer resuming a dead agent (SendMessage keeps
its context) over launching fresh. Note: agents stopped *by the user*
cannot be resumed — re-create fresh. Timers for post-reset resumes are
session-scoped one-shots; they do not fire while the machine sleeps —
check the clock against the reset time before waiting on one.

## Environment gotchas (this Mac)

- The runner image is published multi-arch (linux/amd64 + linux/arm64);
  on this arm64 host docker pulls the native variant automatically.
- clang-format (and the rest of the pinned toolchain) exist ONLY in the
  image. Local check.py starter comparisons and "is it formatted"
  questions must go through the image:
  `docker run --rm -v $PWD:/work -w /work
  ghcr.io/zydo/openoj:latest openoj format <files>`
  (hash files before/after for a check).
- `openoj format` walks directories for their formattable files;
  `xargs -n 200` just bounds the command line when piping many files.
- macOS `split` has no `-n l/3`; use `-l <lines>`. `timeout` is absent.
- Tests that patch `problems.PROBLEMS_DIR` must pass a resolved `Path`
  (safe_problem_path compares resolved paths; /var is a symlink).

## Workflow conventions

- Git: never commit/push unless asked this turn (see ~/.claude/CLAUDE.md
  for the full rules — no auto-amend, no attribution trailers). Session
  work typically lands as a handful of focused commits when the user says
  so; scoped `git add` by path lists, never blanket `git add problems-adapt/`
  mid-split.
- `TODO.md` (openoj): design decisions agreed but not started; when work
  starts, it moves to the session task list; when done, the entry is
  deleted. Keep entries terse — full context goes in docs.
- Scratch/planning files: `.localonly/` (gitignored) in either repo.
- Problems CI (in the runner image): format + static checks on push,
  full judge sweep on dispatch/weekly. Push only format-normalized trees.

## Deployment

Production: GCP VM `katze` (us-east4-a since 2026-08-24 — the old
us-west1-a `openoj` VM is retired; project `zdong-14850-alefa-ai`,
account `zdong.14850@gmail.com`), repo at
`/home/dongziyu/code/openoj`, site https://openoj.dongziyu.com
(TLS is terminated by an edge proxy maintained outside this repo, which
forwards to the web service's published port 8081).

    gcloud compute ssh katze --zone=us-east4-a \
      --project=zdong-14850-alefa-ai --account=zdong.14850@gmail.com \
      --command="cd /home/dongziyu/code/openoj && git pull -q && \
                 docker compose up -d --build"
    curl -fsS https://openoj.dongziyu.com/api/health

The web UI is served plain HTTP on host port 8081 (no TLS inside this
repo). The stack fetches the problem set from `zydo/openoj-problems` on
start. gcloud ssh can be flaky; retry. First account registered through
the gate bootstraps as admin on a fresh DB.

## Extending the problem set — checklist

1. Adapt the statement (copyright-free, algorithm-identical), pick the
   next id/slug, write problem.json (`reference_solution`: "" initially),
   cases.json, statement.md.
2. gen_starters → starters; author the canonical solution ×7 languages
   (fragment shape: the harness assembles provided/ + starter context;
   copy any well-known data structures the wire needs from a sibling
   bundle into your own `provided/<lang>/` — never a shared library;
   mirror an existing bundle's files exactly).
3. verify_solution.py green → check.py green (in image) → in-image
   format → commit per conventions above.
4. Second solution only when a genuinely distinct, competitive
   alternative exists (see the law); author per the variant-wave process;
   set `reference_solution` to the optimal-last variant; update
   solutions.md intro to mirror.
5. Suspect a corpus/judge-data contradiction? Do NOT edit frozen
   cases.json quietly — surface it to the user with evidence.
