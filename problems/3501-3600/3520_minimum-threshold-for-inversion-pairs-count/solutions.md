# Solutions — Minimum Threshold for Inversion Pairs Count

## Binary search on the threshold + Fenwick counting

For a fixed threshold `x` the number of qualifying pairs, `count(x)`, can
only grow as `x` grows — every pair counted at a smaller `x` is still
counted at a larger one. That monotonicity makes the answer a classic
binary search on the value range `[1, max(nums) - min(nums)]`: find the
smallest `x` with `count(x) >= k`. Before searching, `count(max(nums) -
min(nums))` — the total number of inversions — is checked against `k`; if
it is smaller (or the array is constant, where no inversion exists at all)
no threshold works and the answer is `-1`.

Each evaluation of `count(x)` sweeps the array once, carrying a Fenwick
tree over the compressed values. For every `j` it queries how many earlier
elements fall in the value window `(nums[j], nums[j] + x]` — a difference
of two prefix counts — and then inserts `nums[j]`. Every pair is counted
exactly once, at its right index. Two compressed-value lookups per element
come from `bisect`-style binary searches over the sorted distinct values;
the window bound `nums[j] + x` can reach `2 * 10⁹`, so those comparisons
run in 64-bit where the language distinguishes. The pair total itself
never exceeds `n * (n - 1) / 2 < 5 * 10⁷` for `n <= 10⁴`, which fits a
32-bit integer.

**Complexity:** `O(n log n log(max(nums) − min(nums)))` time, `O(n)` space.
