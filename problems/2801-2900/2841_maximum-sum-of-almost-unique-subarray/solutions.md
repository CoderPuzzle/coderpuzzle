# Solutions — Maximum Sum of Almost Unique Subarray

## Fixed-size frequency-map sliding window

Keep a window of exactly `k` elements while sweeping left to right,
maintaining both its running sum and a value-to-count map: each step inserts
the entering element and evicts the one leaving after `k` positions, so the
map size is always the current window's distinct count and each index is
touched at most twice overall. A window becomes a candidate exactly once, at
the step it reaches full length; if its distinct count is at least `m` it
competes with the best answer so far. Because every element is positive, any
qualifying window beats the initial answer of 0, which is also what gets
returned when no length-`k` subarray contains `m` distinct values.

Widths stay bounded: an answer is at most `n * max(nums[i]) = 2 * 10^4 *
10^9 = 2 * 10^13`, past the signed 32-bit range, so the fixed-width
languages accumulate sums in 64-bit integers; JavaScript/TypeScript keep
exact doubles throughout because every sum stays below `2^53`.

**Complexity:** `O(n)` time, `O(k)` space — one pass with map operations on
at most `k` distinct keys.
