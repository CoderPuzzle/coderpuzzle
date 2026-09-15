# Solutions — Maximum Profitable Triplets With Increasing Prices II

## Fix the middle item with two prefix-maximum Fenwick passes

A valid triplet is fully determined by its middle item `j`: the first item
must be some `i < j` with `prices[i] < prices[j]`, and the third some
`k > j` with `prices[k] > prices[j]`, so the best triplet through `j` is
`profits[j]` plus the maximum profit on each of those two sides. With n up
to 5·10⁴, scanning those sides linearly per item is out of reach, so both
sides are answered with Fenwick (binary indexed) trees of maximum values
over compressed price ranks. Sweeping left to right, the prefix query over
ranks strictly below `prices[j]` — taken before item `j` is inserted —
yields `left[j]`, the best profit among earlier cheaper items. A second,
mirrored sweep right to left reuses the same prefix queries over reversed
ranks to fill `right[j]`, the best profit among later pricier items. Both
queries exclude equal ranks by construction, which enforces the strict
inequalities even when prices repeat.

Every profit is at least 1, so a query result of 0 certifies that no item
exists on that side, and item `j` contributes a candidate only when both
`left[j]` and `right[j]` are positive; the answer is the best candidate,
or `-1` when no item has both sides. Each of the two passes performs
`O(n)` Fenwick operations over `m <= n` ranks, and the final scan is
linear.

**Complexity:** `O(n log n)` time, `O(n)` auxiliary space.
