# Solutions — Minimum Prefix Removal to Make Array Strictly Increasing

## Backward scan for the last violation

Because removal can only take a prefix, the surviving part is always a
suffix of `nums`, and a suffix is strictly increasing exactly when none of
its adjacent pairs violates the order. A cut at position `p` keeps every
pair from `p` onward, so it works precisely when `p` lies strictly right
of every violating pair — and the smallest such `p` sits one slot past the
rightmost violation. Scanning from the right and stopping at the first
index `i` with `nums[i] >= nums[i + 1]` therefore answers directly: the
answer is `i + 1`, or `0` when the scan runs off the left end and the
whole array already qualifies.

The scan always terminates with a valid cut, because dropping the first
`n - 1` elements leaves a single element (itself strictly increasing), so
the answer never exceeds `n - 1`: a fully decreasing or constant array
keeps only its last element. No accumulator ever grows past the input
magnitudes — the loop performs element comparisons and carries one index
— so the fixed-width languages return a plain 32-bit `int` (the answer is
at most `10⁵ - 1`), and JavaScript's doubles hold every integer involved
exactly, far inside `2⁵³`.

**Complexity:** `O(n)` time, `O(1)` space.
