# TODO

- **Repeat-and-divide: eliminate "too fast to compare" AND give the
  per-case deadline long-tail protection, one mechanism.** Design settled
  2026-09-22, **implemented 2026-09-22** (see docs/api-and-cli.md §
  Algorithm repeat count for the full writeup, field names, and the data
  behind these numbers) for python/cpp/go/rust/java/js/ts, function-kind
  only. What's left is purely operational, not design or code:
    - **Run the full corpus sweep** (both trees) that actually populates
      `algorithm_repeat_count` for the eligible below-floor pairs — every
      existing calibration record still reads today's single-call
      behavior until this runs. `problems/` first; once clean, the same
      sweep against `lc-adapt`.
    - Fold LC 10's targeted invalidation (below) into that same sweep
      rather than a separate one-off run.
  Merges the two formerly-separate TODO items below, since both
  need the same thing: repeat a judged case's timed call N times inside
  the harness's existing measurement bracket and report the total as that
  case's `algorithm_us`, for both calibration (deriving N per pair) and
  every later submission (replaying the same N so the ratio and the
  deadline both stay apples-to-apples).
    - Per-pair N, not a fixed count per language (a fixed cpp/go/rust/...
      count would either overshoot cheap pairs — wasted latency on every
      future submission, forever — or undershoot the genuinely fastest
      ones). Target: repeat until the total clears **2000us** (10x the
      200us floor, not just past it — margin against the same-scale
      measurement noise the original design already flagged). Cap:
      **N=1000**, chosen from the current corpus's own below-floor
      distribution (4,450 of 25,790 pairs, cpp/go/rust dominant): N=1000
      fully resolves 96.8% of them to target, and because a pair needing a
      large N is by construction one with a tiny per-call cost, the
      worst-case latency ANY cap adds is self-limiting — it stays within
      ~2.2ms of the 2000us target regardless of whether the cap is 200 or 2000. The ~3.2% left short (all measured at exactly 1us on a single
      shot — likely under the timer's real resolution rather than a true
      reading) stay honestly below_floor rather than force a cap increase
      for a number that's probably an artifact to begin with.
    - Store N per (slug, language) in the calibration record (new field,
      alongside `reference_algorithm_us`) and thread it through the judge
      request the same way `limits`/`timeout_ms` already travel — not in
      `problem.json` (no reason to touch 4,000+ files for a
      calibration-derived number).
    - `slowest_case_algorithm_us` (the deadline long-tail fix) is measured
      under this same N, so it's one calibration pass and one new field
      family, not two.
    - Correctness check reads only the first call's result; repeats are
      timing-only.
    - Mutating solutions need a fresh deepcopy of the input before each
      repeat, taken outside the timed bracket (inside it would misattribute
      copy cost as algorithm time, worst for languages/kinds where copying
      is expensive relative to the algorithm itself).
    - **Compiler dead-code elimination — solved, verified empirically per
      language** (not just by reading the generated source): cpp uses a
      `coderpuzzle_keep_alive<T>` asm-volatile barrier, go assigns into a
      package-level sink var, rust uses `std::hint::black_box`, java
      assigns into a `volatile` static field, js/ts assign into a
      module-level sink var. Each was checked by actually compiling a
      throwaway solution and confirming `algorithm_us` scales with
      `CODERPUZZLE_REPEAT` through the real binary/interpreter.
    - **Bug found and fixed during verification**: rust's and js/ts's
      per-repeat argument clone was originally placed *inside* the timed
      span (inline in the call expression, between the mark and the
      elapsed-read), misattributing the clone's own cost as algorithm
      time — caught via non-linear `algorithm_us` scaling, fixed by
      materializing the clone into its own binding one step ahead of the
      timed call in both generators.
    - **Gap found and fixed during verification**: `runner/executors/
      typescript.py` turned out not to share `javascript.py`'s function-kind
      generator as originally assumed — it has its own independent
      template, which had no repeat mechanism at all until this pass added
      one (mirroring the now-fixed javascript.py pattern exactly).
    - Touched every function-kind harness (python, cpp, go, rust, java, js,
      ts), `calibrate.py` (the N-discovery loop, bounded to a few rounds
      per pair), `main.py`/`worker.py` (the two plumbing sites), and a doc
      comment on `judge.py`'s `per_case_timeout_ms` recording the
      no-formula-change invariant it depends on. Design/interactive/
      concurrent/sql/shell are out of scope for this first cut (0.25% of
      below-floor pairs; needs base timing instrumentation for 5 languages
      first). Full pytest suite green (277 passed, 97 subtests) and
      `coderpuzzle format --check` clean on every touched file.

- **Re-calibrate `regular-expression-matching` / `dot-star-pattern-matching`
  (LC 10).** 2026-09-21: hidden case #3's `p` was 21 chars, over the
  problem's own stated `p.length <= 20`; trimmed to 19 (one fewer `a*`
  repeat, same failure shape — `s` still ends in a literal the pattern's
  trailing `c` can't reach), `expected` regenerated from each tree's own
  reference, both trees re-verified 24/24 all languages. Deliberately left
  uncalibrated for now (the pair's cases.json changed, invalidating its
  existing calibration record) — fold its targeted invalidation into the
  next resweep round (the repeat-and-divide one above, once it lands)
  rather than running calibrate.py again just for this one pair.
