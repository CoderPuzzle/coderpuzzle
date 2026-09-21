# TODO

- **Long-tail protection for the per-case algorithm deadline.** The
  overhead/algorithm split in `judge.per_case_timeout_ms` (2026-09-21,
  `docs/api-and-cli.md` § Per-case deadline) uses only the _average_
  reference algorithm time per case; it needs a `slowest_case_algorithm_us`
  field (mirroring `slowest_case_ms`) recorded by `calibrate.py`, folded in
  with `max()` the same way the wall-time long tail already is. Requires a
  code change plus one full re-sweep of both trees (`problems/` and
  `lc-adapt/problems/`, ~14–20h each) to populate the new field.

- **Re-calibrate `regular-expression-matching` / `dot-star-pattern-matching`
  (LC 10).** 2026-09-21: hidden case #3's `p` was 21 chars, over the
  problem's own stated `p.length <= 20`; trimmed to 19 (one fewer `a*`
  repeat, same failure shape — `s` still ends in a literal the pattern's
  trailing `c` can't reach), `expected` regenerated from each tree's own
  reference, both trees re-verified 24/24 all languages. Deliberately left
  uncalibrated for now (the pair's cases.json changed, invalidating its
  existing calibration record) — fold its targeted invalidation into the
  next resweep round alongside the long-tail item above, rather than
  running calibrate.py again just for this one pair.

- **Eliminate "too fast to compare" for genuinely tiny-bound problems.**
  Some problems (LC 10 among them) have a _stated_ bound too small to ever
  scale into (`s.length, p.length <= 20` — the difficulty is the
  recursion, not the size), so cpp/go/rust routinely finish in the tens of
  microseconds and can never clear the 200us floor by raising input size.
  Proposed direction (not yet designed in full, needs its own discussion
  before implementation): repeat the _same_ already-judged case's timed
  call N times back-to-back inside the harness's existing measurement
  bracket, and report the accumulated total (or its average) as that
  case's `algorithm_us` — a microbenchmark-style repeat-and-divide, not a
  warm process pool (still rejected — see docs/api-and-cli.md's Execution
  timing profiles section and the original algorithm-timing design notes
  on sandbox privilege-drop and cross-submission state leakage). Open
  questions before this can be built: repeat count fixed globally vs.
  derived per-pair at calibration time; the correctness check must still
  read only the first call's result (repeats are timing-only); mutating
  solutions need a fresh deepcopy of the input before each repeat, and
  that copy has to sit outside the timed bracket without disguising its
  own cost; the change touches every language harness (~13 files, the
  same surface as the original algorithm-timing rollout) so it costs
  another full corpus sweep once landed.
