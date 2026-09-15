# Solutions — Minimum Time to Make Array Sum At Most x

## Sort by growth rate, then a knapsack on operation count

Two exchange arguments shrink the search space to something finite. First,
an optimal schedule zeroes each index at most once: if `nums1[i]` ends up
zeroed twice, removing the earlier zeroing and letting all later operations
“shift left” by one second is never worse, so at most `n` operations matter
and time beyond second `n` is only worth checking while nothing succeeds.
Second, if operations land on indices `i₁, ..., iₖ`, performing them in
ascending order of growth rate `nums2` is optimal: zeroing index `e` as the
`j`-th operation removes `nums1[e] + nums2[e] * j` from where the sum would
otherwise end, and that reward grows with `j`, so larger rates must claim
later slots.

With both facts in hand, sort the pairs by `nums2` ascending and run a
knapsack over operation counts: `best[j]` is the maximum total amount removed
using exactly `j` operations among the elements processed so far, and taking
the current element as the `j`-th operation extends it by
`nums1[e] + nums2[e] * j`. After all elements, sweeping `t = 0..n` finds the
earliest moment where the untouched-growth baseline
`sum(nums1) + sum(nums2) * t` minus `best[t]` drops to `x` or below. Waiting
past second `n` adds growth but no new removable value (`best` is capped),
and an unsatisfiable instance is detected by simply falling out of that
sweep, giving the `-1`.

**Complexity:** `O(n²)` time, `O(n)` space.
