# Solutions — Minimum Index Sum of Common Elements

## First-occurrence hash map

For a value shared by both arrays, every good pair it produces is an index
`i` in `nums1` paired with an independent index `j` in `nums2`, and the sum
`i + j` only grows as either index moves right. So the cheapest pair for
that value is its first occurrence in each array, and the answer is the
smallest of those per-value minima — or `-1` when the arrays share nothing.

A hash map from value to first index captures exactly that. Walk `nums1`
once, recording each value only when it is not already present, so later
duplicates never overwrite the earlier index; then walk `nums2` once and
score `map[nums2[j]] + j` for every value the map knows about. Keeping the
smallest score across that second pass is the whole computation: ties fall
out naturally because a tie just means two values reached the same minimum,
and the flag stays `-1` when no score was ever produced.

The two passes touch each element a constant number of times and the map
holds at most one entry per distinct value, so the work is linear in `n`
regardless of how the duplicates are arranged.

**Complexity:** `O(n)` time, `O(n)` space.
