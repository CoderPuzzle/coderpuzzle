# Solutions — Count Subarrays Where Max Element Appears at Least K Times

A subarray qualifies exactly when it contains at least k copies of M, the
maximum of the whole array — any subarray's maximum is at most M, so the
condition never fires for a smaller value. That turns the count into a
question about windows over the positions of M, which a single left-to-right
scan can answer incrementally.

## Sliding window over k occurrences of the maximum

Scan the right end of the subarray from left to right, keeping a running
count of how many times M sits inside the current window. Whenever the
count reaches k, advance the left end — dropping a leading M each time —
until exactly k - 1 copies remain. At that moment `left` is the number of
starting positions that still keep k copies of M inside the subarray
ending at the current index: every start from 0 up to `left` - 1 leaves
the k-th copy in view, and start `left` itself would drop below k. Adding
`left` per right end therefore counts each qualifying subarray exactly
once, at its right end, and the left end only ever moves forward, so the
whole pass is linear.

The count fits in 64 bits: with n <= 10⁵ subarrays number at most
n·(n + 1) / 2 ≈ 5 · 10⁹, which overflows 32 bits but is exact in every
language's 64-bit integer (and far below 2⁵³ for JavaScript's numbers).

**Complexity:** `O(n)` time, `O(1)` space.
