# scripts/ — authoring gates and local dev drivers

Tracked tooling for this checkout's `problems/` tree and any other
on-disk problem set selected with `CODERPUZZLE_PROBLEMS`.

## Authoring gates

- `verify_solution.py <shard-qualified-bundle-key> [<ext> ...]` — THE
  gate: judges every `solution*.<ext>` in a bundle through the real
  executors, locally, without sandboxing. Compiles the Java harness
  (`runner/java/CoderPuzzleJavaHarness.java`) into `.localonly/java-classes/`
  on demand; local cpp compiles get the `-I scripts/verify_shim` shim.
  Needs `frontend/node_modules` installed (tsc) and the local
  toolchain on PATH.
- `verify_corpus.py` — whole-corpus consistency check (crawl index ↔
  bettercode ↔ this repo's originals ↔ the private adapted tree keyed by
  MAPPING.json):
  coverage, slug parity, shard placement, bundle file shape, the 13
  `-crawl` twins. Run after any tree surgery. Upstream scrape sources
  default to `~/code/lc-crawl` and `~/code/bettercode`; override with
  `CODERPUZZLE_CRAWL` / `CODERPUZZLE_BETTERCODE`; set
  `CODERPUZZLE_ADAPTED_PROBLEMS` to the adapted `problems/` directory.

## Headless-UI drivers (frontend work)

- `stub-server.mjs` — stub API server for offline UI work; verdicts
  flip via the mode file `.localonly/stub-mode` (`ok`|`wa`|`tle`).
- `shot.mjs` — puppeteer screenshot driver (writes `.localonly/shots/`).
- `session-e2e.mjs` + `session-e2e-server.mjs` — session/idle-expiry
  end-to-end scenario (serves `frontend/dist`, proxies `/api` to a
  local uvicorn).
- `ascii.py`, `see-seal.py` — render screenshots as palette-bucketed
  ASCII for layout inspection without vision.
