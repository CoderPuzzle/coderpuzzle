# Solutions — Equal Sum Arrays With Minimum Number of Operations

## Count every operation's best gain, spend the largest first

Only the two sums matter, and every operation moves them toward or away from
each other. An element `v` of the larger-sum array can shed at most `v - 1`,
and an element `v` of the smaller-sum array can add at most `6 - v`, so each
element offers exactly one operation worth closing that much of the gap — and
no operation can ever do better. The fewest operations therefore spend the
largest available gains first, and since values live in `1 .. 6` the gains
live in `1 .. 5`, letting a six-slot counter replace any search structure.

The method tallies the gains from both arrays into that counter, then walks
from gain `5` down to `1`, taking `min(count, ceil(gap / gain))` operations
per level and shrinking the gap as it goes; the final operation may land
partway, which is fine because a value may be set to anything in `1 .. 6`.
Equality is impossible exactly when the reachable sum ranges `[n, 6n]` of the
two lengths are disjoint — `max(len(nums1), len(nums2)) > 6 * min(...)` —
answered with `-1` up front. Lengths cap at `10⁵` and values at `6`, so every
sum and gap stays below `6 × 10⁵` and ordinary 32-bit integers carry them all.

**Complexity:** `O(n1 + n2)` time, `O(1)` space.
