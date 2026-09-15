# Solutions — Minimum Time to Activate String

## Binary search on the activation time

Every replacement can only help: a substring becomes valid the moment it
gains its first star and never loses that star afterwards, so the count of
valid substrings climbs monotonically from step to step. The activating
times therefore form a suffix of `0 … n - 1`, and the earliest one can be
found by binary search, provided each candidate time can be tested.

Testing a time `t` stars the first `t + 1` entries of `order`. After that,
a substring is invalid exactly when it fits inside a maximal star-free run:
a run of length `L` hides exactly `L * (L + 1) / 2` such substrings, summed
conveniently by sweeping once and adding an increasing counter inside each
run. Subtracting that sum from `n * (n + 1) / 2` gives the valid count to
compare against `k`. One guard comes first: a fully starred string tops out
at `n * (n + 1) / 2` valid substrings, so any larger `k` answers `-1`
immediately — and otherwise time `n - 1` is guaranteed feasible, giving the
search a sound upper bound.

Each probe marks positions and sweeps once for `O(n)` work, and the window
halves `O(log n)` times. The counters must be wide: at `n = 10⁵` the total
approaches `5 × 10⁹`, past what 32-bit arithmetic holds even though the
final answer itself always fits.

**Complexity:** `O(n log n)` time, `O(n)` space.
