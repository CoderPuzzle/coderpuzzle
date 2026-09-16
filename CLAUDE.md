# CoderPuzzle — judge infrastructure and problem set

One repo. This tree is the judge (FastAPI app, React frontend, runner image
`ghcr.io/coderpuzzle/coderpuzzle`, toolchain, authoring tooling, docs) AND the
problem set it serves.

- **`problems/`** (tracked, ~7.8 GB, 4,031 bundles) — the curated
  original-source corpus, served by default. Bettercode originals keep
  their canonical names; the 13 extend-side twins carry a `-crawl` slug
  suffix. `docs/BETTERCODE-SUBSET.md` lists the bettercode-derived ids.
- **`CoderPuzzle/lc-adapt`** (private, sibling `../lc-adapt`) — the
  copyright-free adaptation: 838 bettercode-derived bundles plus 3,193
  extend-derived ones, all carrying their **original source ids**, and
  holds nothing else. Renamed from `coderpuzzle-problems` and made private
  on 2026-09-15, when this repo took over the original corpus, the tooling,
  and the docs. Its `problems/MAPPING.json` is copied here as
  `scripts/problems-tooling/adapt-mapping.json` (the provenance ledger);
  `docs/ADAPTATION-MAPPING.md` is the human-readable form.
- **A problem set is always a directory on disk.** The app fetches
  nothing: no remote set, no clone, no cache service. One selector,
  `CODERPUZZLE_PROBLEMS`, always a filesystem path, defaulting to this
  repo's `./problems`. Compose bind-mounts the host directory named by
  `CODERPUZZLE_PROBLEMS_PATH` (default `./problems`) read-only at
  `/problems`. Anything else — a GitHub `owner/name`, a git URL, a
  missing path — is a startup error.

## Adaptation philosophy

The adapted tree holds **copyright-free, algorithm-identical adaptations**
of the `problems/` originals: rewritten statements in the adaptation's own voice,
the source's own id kept (shard = `0001-0100`-style hundreds buckets),
descriptive kebab slugs, restated examples/constraints. `difficulty` mirrors
the source difficulty (Easy/Medium/Hard) in both trees — never a
re-evaluation; tags follow the normalized scheme. The served originals tree
carries the crawl/curation provenance instead of an adaptation voice.

## Bundle format (docs/FORMAT.md is authoritative)

    problems/<shard>/<id>_<slug>/
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

## Judge infrastructure (coderpuzzle/)

- `runner/` — executors for python3, java, cpp, go, rust, typescript,
  javascript (+sql, +shell), compiler/runtime privilege split
  (`compiler_sandbox.py`, `runtime_sandbox.py`), and the authoring CLI.
- **The judge protocol travels on fd 63; stdout is only a local-tooling
  fallback.** Anything that spawns harnesses outside the worker (local
  verify scripts) parses stdout instead.
- Runner image `ghcr.io/coderpuzzle/coderpuzzle` owns the pinned toolchain and
  **all formatting**: `runner/formatters.py` is the single formatting owner
  (markdown + canonical JSON + per-language code). `scripts/format.py` is
  only a loader shim; there is deliberately no local toolchain here.
- Problem-set selection is one environment variable, `CODERPUZZLE_PROBLEMS`
  (a directory path, default `./problems`), resolved once at import in
  `api/app/problems.py`. Compose maps the host path
  `CODERPUZZLE_PROBLEMS_PATH` (default `./problems`) onto `/problems:ro`.
  There is no fetcher service and no problem cache.

## Core APIs and CLI

App (`api/app/`): `/problems`, `/problems/{slug}`, `/run`, `/submit`,
`/format`, `/drafts/*`, `/submissions*`, `/progress` (per-viewer solved/
attempted marks), `/session` (GET accepts `?touch=0` — validate without
extending the idle clock, used by the frontend's inactivity watcher),
`/auth/*` (pluggable providers: `GET /auth/status` returns the catalog;
password is one provider — `docs/AUTH.md`). Submit stores the attempt (code, verdicts, runtime, and the
reference runtime the time-cost % is measured against) under the viewer's
scope: `user:<id>` when signed in (survives idle expiry), the guest
session id otherwise (purged with the session). Idle expiry routes the
UI to a dedicated logged-out page.

CLI (inside the runner image): `coderpuzzle format <files>` (formats in place;
`--check` gates; `--report json` emits the non-mutating tri-state
formatted/unformatted(+text)/error(+diagnostics) per file — the same
contract as REST `POST /format`), `coderpuzzle gen-starters`,
`coderpuzzle judge <bundle>` (judges every `solution*.<ext>` through the real
executors, assembling the bundle's own `provided/` sources),
`coderpuzzle run <file>` (single-file fast loop: discovers the bundle upward,
infers the language, `--public` for public cases only; compiles plainly
like `judge` — authoring tool, not the untrusted-submission sandbox).
REST + CLI reference: `docs/api-and-cli.md`; the provided-code trust
stance (non-secret by construction) is documented in
`docs/TRUST-BOUNDARIES.md`. `scripts/format.sh` wraps the docker-run
invocation.

## Authoring and verification loop

1. Scrape/curate an original (lc-crawl → bettercode), land it here under
   `problems/<shard>/`, then adapt it into the private `lc-adapt` tree
   (statement, problem.json, cases, canonical solution in all 7 languages).
2. `scripts/gen_starters.py` regenerates starters from problem.json.
3. **Verify**: `CODERPUZZLE_PROBLEMS=<tree> python3 scripts/verify_solution.py
   <shard>/<id>_<slug>` — judges every solution in the bundle through the
   real executors; defaults to this repo's `problems/`.
4. **Check**: `python3 scripts/check.py --tree problems --skip-runtime` —
   static tier: problem.json exact key set, statement grammar, starter =
   generator output (clang-format lives only in the image, so run it there),
   plus a judged runtime tier.
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
was deleted 2026-09-04 with every item resolved; its history is in git. Surface new contradictions to the user with evidence.

## Tooling map

- `/scripts/` (tracked; see its README.md): the corpus gates
  (`verify_solution.py`, `verify_corpus.py`), the moved authoring tooling
  (`check.py`, `format.py`, `gen_starters.py`), and the headless-UI
  drivers (`stub-server.mjs`, `shot.mjs`, `session-e2e.mjs`). The
  gitignored `/.localonly/` holds only regenerable cache (the compiled
  Java harness).
- `docs/`: the moved bank documentation (`FORMAT.md`, `BETTERCODE-SUBSET.md`,
  `ADAPTATION-MAPPING.md`, `FLEET-LOG.md`) beside the judge docs.

## Fleet discipline (agent concurrency)

The completed adaptation program's state ledger lives at
`docs/FLEET-LOG.md` (tracked; recreated 2026-09-05 for variant wave II after
the original ledger was deleted 2026-09-04, and ends "PROGRAM COMPLETE —
2026-09-06"). If a future fleet runs, append there and record every rate-limit event.
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
  ghcr.io/coderpuzzle/coderpuzzle:latest coderpuzzle format <files>`
  (hash files before/after for a check).
- `coderpuzzle format` walks directories for their formattable files;
  `xargs -n 200` just bounds the command line when piping many files.
- macOS `split` has no `-n l/3`; use `-l <lines>`. `timeout` is absent.
- Tests that patch `problems.PROBLEMS_DIR` must pass a resolved `Path`
  (safe_problem_path compares resolved paths; /var is a symlink).

## Workflow conventions

- Git: never commit/push unless asked this turn (see ~/.claude/CLAUDE.md
  for the full rules — no auto-amend, no attribution trailers). Session
  work typically lands as a handful of focused commits when the user says
  so; scoped `git add` by path lists, never a blanket `git add problems/`
  mid-split.
- `TODO.md` (coderpuzzle): design decisions agreed but not started; when work
  starts, it moves to the session task list; when done, the entry is
  deleted. Keep entries terse — full context goes in docs.
- Scratch/planning files: `.localonly/` (gitignored) in either repo.
- Problems CI (`.github/workflows/check-problems.yml`, runner image):
  format + static checks on relevant pushes; a sharded all-bundle judge
  sweep on dispatch and weekly. Push only format-normalized trees.

## Deployment

Production: GCP VM `katze` (us-east4-a since 2026-08-24 — it replaced
the retired us-west1-a VM; project `zdong-14850-alefa-ai`,
account `zdong.14850@gmail.com`), repo at
`/home/dongziyu/code/coderpuzzle`, site https://coderpuzzle.dongziyu.com
(TLS is terminated by a caddy container on the VM itself —
`/home/dongziyu/code/mycaddy/Caddyfile`, shared with the bedtimenews
stack; it bind-mounts that single file, so hostname edits need an
inode-preserving rewrite (`sed … > tmp && cat tmp > Caddyfile`) plus
`docker restart caddy`, then reload).

    gcloud compute ssh katze --zone=us-east4-a \
      --project=zdong-14850-alefa-ai --account=zdong.14850@gmail.com \
      --command="cd /home/dongziyu/code/coderpuzzle && git pull -q && \
                 docker compose up -d --build"
    curl -fsS https://coderpuzzle.dongziyu.com/api/health

The web UI is served plain HTTP on host port 8081 (no TLS inside this
repo). The stack serves the checked-in `problems/` tree through a read-only
bind mount — a deploy pulls the corpus with the code. gcloud ssh can be
flaky; retry. First account registered through
the gate bootstraps as admin on a fresh DB.

## Calibration checkpoint (2026-09-15)

Production `katze` ran the full 25,505-combination sweep and produced
16,931 successful records — but the tail of it (8,574 failures) was ONE
runner-host fault, not corpus defects: the runner's 384 MiB `/tmp` tmpfs
filled completely (unbounded Go build cache + a `_sweep_tmp` that could
not unlink `nobody`-owned litter without `CAP_FOWNER`), after which
compiled languages could not write objects and interpreted ones could not
stage source. Calibration runs in id order, so the damage is a clean
block: successes stop at id 2709 and failures run 2640 → 4018 unbroken,
1,173 slugs failing in all seven languages.

Retrying only the failed combinations, with the `/tmp` fixes deployed,
left **six** standing failures — no tail at all:

- four are real, reproducible defects: ids 366, 690, 1226, 1265 (below);
- two (2364, 2369 — python3, ~6-minute `runtime_error`s on the largest
  case corpora) were the prewarm/job collision, not the bundles: the
  periodic compiler warm-up could not spawn its helper processes and then
  starved the testcase running beside it.

Runner fixes landed with this checkpoint (all verified in a rebuilt
image, then re-verified against the live sandbox):

1. `runner/Dockerfile` + `compose.yaml` — `cap_fowner` on the supervisor
   binary (file capabilities are authoritative; `cap_add` only widens the
   bounding set), so `_sweep_tmp` can actually reclaim the litter.
2. `runner/worker.py` — the Go build cache is size-capped
   (`CODERPUZZLE_GOCACHE_MAX_BYTES`, default 128 MiB) and trimmed between
   jobs; prewarm setup is idempotent and one toolchain failing no longer
   cancels the rest.
3. `runner/worker.py` — **prewarming and judging no longer overlap**. A
   queued job cancels the warm-up's process group and takes an execution
   lock, so a compiler warm-up can never compete with (or kill) the
   testcase beside it. This was the cause of the remaining 6-minute
   `runtime_error`s in the resumed sweep.
4. `runner/executors/cpp.py` — struct record fields are decoded into
   locals before the constructor call. `Decoder<A>::read(r), Decoder<B>::read(r)`
   as call arguments had unspecified evaluation order, so a field could
   read the other field's bytes (LC 690: "Truncated judge input").
5. `runner/executors/go.py` (+ `compiled.py`) — `go build` gets its own
   helper-process budget (`compiler_max_processes = 64`) instead of the
   runtime's 32. RLIMIT_NPROC is uid-global, so the runtime-sized limit
   could be spent by unrelated uid-65534 processes and kill a compile.
6. `runner/executors/java.py` — a flat `schedule_address_space_mb = 1024`
   for concurrency problems; the JVM reserves another region as soon as a
   schedule spawns threads, so 1226 died with "unable to create native
   thread" even at 768 MiB of allowance.
7. `api/app/calibrate.py` — a consecutive-failure circuit breaker that
   aborts without publishing; hardware identity without the container
   hostname; `--force` resumes; `--restart` is the explicit discard; and
   the published failures list no longer carries stale entries.

Corpus fixes (both trees):

8. LC 1265 `print-immutable-linked-list-in-reverse` — the C++ provided
   oracle passed `nullptr` as the chain owner, so every node believed it
   owned the tail: recursive double free, 0/16 in the sandbox, 16/16
   after. Fixed in `problems/` and in the adapted twin.
9. LC 0366 `find-leaves-of-binary-tree` — `max(height(left), height(right))`
   has unspecified argument evaluation order, so group order was
   compiler-dependent. Sequenced into locals in both trees.

Production still must re-run the 8,574 previously failed combinations
with `--force` (valid records are kept; only missing ones are measured).

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
