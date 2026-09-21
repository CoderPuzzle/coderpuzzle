# TODO

- **Long-tail protection for the per-case algorithm deadline.** The
  overhead/algorithm split in `judge.per_case_timeout_ms` (2026-09-21,
  `docs/api-and-cli.md` § Per-case deadline) uses only the _average_
  reference algorithm time per case; it needs a `slowest_case_algorithm_us`
  field (mirroring `slowest_case_ms`) recorded by `calibrate.py`, folded in
  with `max()` the same way the wall-time long tail already is. Requires a
  code change plus one full re-sweep of both trees (`problems/` and
  `lc-adapt/problems/`, ~14–20h each) to populate the new field.
