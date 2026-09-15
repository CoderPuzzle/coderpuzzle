# Solutions — Longest Non-decreasing Subarray From Two Arrays

## Linear DP over the pick at each index

Scan the two arrays left to right keeping two rolling values: `run1` is the
length of the longest non-decreasing run that ends exactly at the current
index if we assign `nums1[i]` to `nums3[i]`, and `run2` the same for picking
`nums2[i]`. Both start at 1. Moving to index `i`, a pick of `v` extends a
predecessor run whenever `v` is at least that predecessor's value, so
`run1` becomes 1 plus the larger of `run1` (if `nums1[i] >= nums1[i - 1]`)
and `run2` (if `nums1[i] >= nums2[i - 1]`), falling back to 1 when neither
holds; `run2` follows the same rule against both previous values.

The "ends exactly at this index" qualification is what makes these local
transitions valid: a non-decreasing run ending at `i` with value `v`
decomposes into its last adjacent pair plus a non-decreasing run ending
exactly at `i - 1` with some value at most `v`, and conversely any such pair
of runs concatenates. Because each new state considers **both** predecessor
states regardless of which array the current pick came from, the constructed
array may switch sources anywhere mid-run — Example 2's full switch from
`nums1[0]` onto `nums2[1] .. nums2[3]` is just the transition
`run1 -> run2`. Equal adjacent values extend the run too, since the
comparisons are `>=`. No shorter answer is ever locked in prematurely:
the final answer is the maximum over every state seen along the way, not
just the last pair.

Both counters are plain integers (a run length never exceeds `n <= 10⁵`,
and the values themselves fit in 32 bits), so nothing overflows. Keeping
only the previous index's two states leaves a single constant-size scan.

**Complexity:** `O(n)` time, `O(1)` space.
