# Solutions — Valid Subarrays With Exactly One Peak

## Count endpoint choices around each peak

Collect the peak indices in one pass. For a subarray to contain exactly one
peak, that peak must be the only one inside it, so its left endpoint `l`
must stay past the previous peak and its right endpoint `r` must stay before
the next peak; the distance conditions further force `l >= i - k` and
`r <= i + k`. With the previous peak `p` and next peak `q` fixed, the left
endpoint ranges over `[max(i - k, p + 1), i]` and the right endpoint over
`[i, min(i + k, q - 1)]`.

Each choice of `l` pairs freely with each choice of `r`, so the peak
contributes the product of the two range lengths; summing over every peak
gives the answer. Adjacent peaks simply leave no room for a subarray that
contains both, which the `p + 1` / `q - 1` bounds enforce exactly. The two
neighbor indices are found by walking the peak list, and the whole scan is
iterative.

The count can reach `(n/2 + 1) · (n/2)` on a single-peaked array, which
exceeds `2³¹` for `n = 10⁵`, so the running total uses 64-bit arithmetic
(JavaScript's doubles are exact up to `2⁵³`, comfortably above the worst
case).

**Complexity:** `O(n)` time, `O(n)` space.
