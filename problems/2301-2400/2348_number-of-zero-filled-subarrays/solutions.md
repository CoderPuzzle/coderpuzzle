# Solutions — Number of Zero-Filled Subarrays

## Count subarrays by where they end

Every zero-filled subarray ends at exactly one index, so counting subarrays
by their final index counts each one exactly once. The subarrays of zeros
ending at index `i` are precisely those that reach back over the run of
consecutive zeros passing through `i` — a run of length `r` contributes
`r` subarrays ending at its last cell, one for each possible start. That
is the whole insight: keep a running count of the consecutive zeros behind
the current position, add it to the answer at every zero, and reset it to
zero at any nonzero value.

A run of length `r` therefore ends up contributing `1 + 2 + ... + r =
r(r+1)/2` in total, matching the direct formula for the number of
contiguous spans inside the run — the two views agree, but the incremental
one needs only a single pass and no second loop over runs.

The answer peaks when the array is all zeros: `100000 * 100001 / 2 ≈
5.0 × 10⁹`, which overflows 32-bit signed integers, so fixed-width
languages accumulate in 64 bits (JavaScript's doubles hold integers far
past this exactly).

**Complexity:** `O(n)` time, `O(1)` extra space.
