# Solutions — Stable Subarrays With Equal Boundary and Interior Sum

## Pair-matched prefix sweep

Prefix sums collapse the stability test into a lookup. With `p[i]` the sum
of `capacity[0..i]`, the interior sum of `[l, r]` is `p[r - 1] - p[l]`, so
the subarray is stable exactly when the pair `(capacity[l], p[l])` equals
`(capacity[r], p[r - 1] - capacity[r])` — equal boundary values, and an
interior-sum clause turned into plain prefix equality. One sweep over `r`
then answers every right end: carry a map from `(capacity[i], p[i])` to how
many positions hold that pair, and at each `r` add the count read from key
`(capacity[r], p[r - 1] - capacity[r])`.

Timing makes the length rule free. Position `i` can only be the left
boundary of a subarray ending at `r` once `r - i >= 2`, so the sweep inserts
position `r - 2` into the map just before querying for `r`. Nothing younger
is ever visible, no separate length bookkeeping is needed, and since every
position is inserted exactly once, each qualifying `(l, r)` pair is counted
exactly once.

Both accumulators outgrow 32 bits at the constraint ceiling. The running
prefix reaches `n · 10⁹ = 10¹⁴`, so fixed-width languages sum in 64-bit
integers even though every element fits in 32; and an all-zero array makes
every subarray of length 3 or more stable — nearly `5 × 10⁹` of them at
`n = 10⁵` — which is why the count itself is returned in 64 bits, still far
inside JavaScript's `2⁵³` safe range.

**Complexity:** `O(n)` time, `O(n)` space.
