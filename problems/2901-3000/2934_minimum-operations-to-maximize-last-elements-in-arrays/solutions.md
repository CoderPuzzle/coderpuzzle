# Solutions — Minimum Operations to Maximize Last Elements in Arrays

## Try both fates of the last column

Only the last index is special, and it has just two possible fates: either
the last column is never swapped, so the targets are `nums1[n - 1]` and
`nums2[n - 1]` as they stand, or it is swapped, costing one operation and
exchanging the two targets. Settle each fate on its own terms and keep the
cheaper feasible one.

For fixed targets, every earlier index can be decided independently and
greedily, because each condition only bounds that index's two values from
above — no index cares what any other index does. Look at the pair
`(nums1[i], nums2[i])`: if it already fits under the targets, swapping
there would only waste an operation, so keep it; otherwise try it crossed —
it fits crossed exactly when each value lands under the other target — and
count one operation; if it fits neither way, this fate is dead and no
swaps elsewhere can save it. Summing the forced swaps gives the cheapest
cost for that fate, entirely in one scan with two running values.

The answer is the smaller of the two fate costs, or `-1` when both are
dead. Note the answer can never exceed `n`: if the last column is swapped,
at most `n` indices are touched in total. Values reach `10⁹` and nothing
is ever summed, so 32-bit integers are safe in every language.

**Complexity:** `O(n)` time, `O(1)` space.
