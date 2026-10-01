# scripts/ — authoring gates and local dev drivers

Tracked tooling for this checkout's `problems/` tree and any other
on-disk problem set selected with `CODERPUZZLE_PROBLEMS`.

## Authoring gates

- `verify_solution.py <shard-qualified-bundle-key> [<ext> ...]` (or
  `<key> --solution <file> [--solution <file> ...]` — repeatable, may
  appear anywhere after the key, and mutually exclusive with ext
  filters — to judge the named external file(s) against the bundle's
  cases instead of its own `solution*` files) — THE
  gate: judges every `solution*.<ext>` in a bundle through the real
  executors, locally, without sandboxing. Compiles the Java harness
  (`runner/java/CoderPuzzleJavaHarness.java`) into a fresh temp dir once
  per run; local cpp compiles get the `-I scripts/verify_shim` shim.
  TypeScript compiles with the image-pinned tsc from `scripts/ts-pin`
  (tracked spec; `npm ci --prefix scripts/ts-pin` bootstraps it), falling
  back to `frontend/node_modules` when the pin is absent. Needs the local
  toolchain on PATH.
- `verify_corpus.py` — whole-corpus consistency check (crawl index ↔
  bettercode ↔ this repo's originals ↔ the private adapted tree keyed by
  MAPPING.json):
  coverage, slug parity, shard placement, bundle file shape, the 13
  `-crawl` twins. Run after any tree surgery. Upstream scrape sources
  default to `~/code/lc-crawl` and `~/code/bettercode`; override with
  `CODERPUZZLE_CRAWL` / `CODERPUZZLE_BETTERCODE`; set
  `CODERPUZZLE_ADAPTED_PROBLEMS` to the adapted `problems/` directory.
- `check.py` — the repo's main static gate, the one CI runs
  (`.github/workflows/check-problems.yml`: `python3 scripts/check.py
--tree problems --skip-runtime`): bundle completeness, schema
  conformance, statement grammar, duplicate ids/slugs,
  `solution.* ⊇ starter.*`, and the starter generator round-trip.
  `--problems=` additionally selects bundles for the runtime tier.
- `gen_starters.py` — regenerates every `starter.*` from `problem.json`
  (`--check` diffs, writes nothing); the Python style follows each
  bundle's provenance via `problems-tooling/adapt-mapping.json` unless
  `--style` overrides it.
- `format.py` / `format.sh` — the formatter loaders: `format.py` imports
  the pinned implementation (this checkout's `runner/formatters.py`, or
  the image's `/runner` copy) and formats or `--check`s in place;
  `format.sh` runs the same command inside the runner image via docker,
  bind-mounting the checkout's `runner/cli.py` +
  `runner/formatters.py` over the image's copies.
- `prepare_judge_host.py` — provisions one exclusive, bounded cgroup v2
  slot on a dedicated Linux host and emits the env file that
  `compose.isolated.yaml` consumes; see docs/JUDGE-RESOURCES.md.
- `stress_judge.py` — collects real HTTP judge timings from a live
  deployment, driven by a private (untracked) manifest of test-account
  credentials and exported source strings.

## Support directories

- `ts-pin/` — tracked TypeScript pin (spec + lockfile) behind
  `verify_solution.py`'s local TS tier; `npm ci --prefix scripts/ts-pin`
  bootstraps it.
- `problems-tooling/` — `adapt-mapping.json` (the provenance ledger
  `gen_starters.py` keys Python starter style from) and a `package.json`
  pinning prettier / prettier-plugin-java / sql-formatter to the runner
  image's exact versions for local format runs (`node_modules`
  gitignored).
- `verify_shim/` — include-path shim handed to local C++ compiles under
  `verify_solution.py`.

## Headless-UI drivers (frontend work)

- `stub-server.mjs` — stub API server for offline UI work; verdicts
  flip via the mode file `.localonly/stub-mode` (`ok`|`wa`|`tle`).
- `shot.mjs` — puppeteer screenshot driver (writes `.localonly/shots/`).
- `session-e2e.mjs` + `session-e2e-server.mjs` — session/idle-expiry
  end-to-end scenario (serves `frontend/dist`, proxies `/api` to a
  local uvicorn).
- `ascii.py`, `see-seal.py` — render screenshots as palette-bucketed
  ASCII for layout inspection without vision.
