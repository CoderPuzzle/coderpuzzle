# Solutions — Handling Sum Queries After Update

## Lazy Segment Tree with Range Flip

Type-1 queries flip a range of `nums1`, type-2 queries need only the _total number of ones_ currently in `nums1` (since `nums2[i] += nums1[i] * p` sums to `p * popcount`), and type-3 queries report the running sum of `nums2`. The last two become O(1) bookkeeping once a data structure can apply a range flip and report the total ones quickly — which is exactly a segment tree over the 0/1 array with a lazy "flip" flag, where flipping a whole segment transforms its sum into `segment_length - sum`.

The tree stores per-node sums and pending-flip flags. A range flip recurses like standard point-update trees but stops early: nodes fully covered by `[l, r]` apply the flip locally (invert the sum, toggle the flag) and return, so work is O(log n) per query. The flag means "your children's data is stale"; before any recursion into a partially covered node, `_push` propagates the flag by flipping both children and clearing it. Since the only query besides flips reads the root's sum (which lazy application keeps correct at every node it touches), the implementation gets away with never pushing on the read path.

On top of the tree, the driver keeps `total = sum(nums2)` incrementally: a type-2 query adds `p` times the root sum, a type-3 query appends the current `total`, and type-1 queries just call `flip`. This avoids ever materializing or rescanning `nums2`, whose values reach 10^9 and whose length is 10^5 — recalculating the sum per query would be O(n) each time and too slow for 10^5 queries. Building the tree once costs O(n), and the 4n-sized arrays hold sums and flags.

**Complexity:** `O(n + q log n)` time, `O(n)` space.
