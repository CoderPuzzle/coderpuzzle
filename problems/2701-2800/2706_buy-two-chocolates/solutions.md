# Solutions — Buy Two Chocolates

## Track the two smallest prices in one pass

Minimizing the sum of the two chocolates you buy means picking the two
smallest prices in `prices`. A single pass keeps the smallest value seen so
far in `first` and the second smallest in `second`: each price either
becomes the new smallest — pushing the previous smallest down into
`second` — or it competes only for `second`. Both start above the largest
possible price (`101`), so the first two inputs always fill them.

After the pass, `first + second` is the minimum achievable pair sum. If it
exceeds `money`, then no pair of chocolates leaves a non-negative leftover,
and the answer is `money` unchanged. Otherwise the leftover is
`money - first - second`, which is non-negative by the check just made.
This improves on the sort the hint suggests — two registers of state
instead of `O(n log n)` work.

**Complexity:** `O(n)` time, `O(1)` space.
