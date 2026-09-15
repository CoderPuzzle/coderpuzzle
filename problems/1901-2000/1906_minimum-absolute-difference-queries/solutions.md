# Solutions — Minimum Absolute Difference Queries

The minimum of `|a[i] - a[j]|` over a range never depends on where
elements sit — only on which values occur: the closest unequal pair is
always a pair of value-adjacent occurrences. Since values stop at 100,
the value axis, not the index axis, is the small dimension to sweep.

## Presence rows on the value axis

Build one prefix-count row per value `v` in `1..100`: row `v` at index
`i` holds how many times `v` occurs in `nums[0..i)`. Then `v` occurs in
`nums[l..r]` exactly when row `v` rises between columns `l` and `r + 1`
— two array reads, no scanning of the range itself. A query walks
`v = 1..100`, keeps the values whose rows rise (they arrive in
increasing order), and answers with the smallest difference between
consecutive kept values; if fewer than two rows rise, every element of
the range is the same and the answer is `-1`.

The table costs `O(100 · n)` to build — ten million cheap increments
for the largest `n` — and each of the up-to-`2 × 10⁴` queries costs
`O(100)` reads, so the whole run is linear in the small constant.
Stored flat it occupies roughly `40 MB`, inside the memory budget, and
nothing in it ever leaves 32-bit width: a count is at most `n = 10⁵`
and an answer is at most `99`, both far below any overflow line (and
far below `2⁵³`, so JS `number` arithmetic stays exact).

**Complexity:** `O(100 · (n + q))` time, `O(100 · n)` space.
