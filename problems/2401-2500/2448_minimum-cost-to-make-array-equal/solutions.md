# Solutions — Minimum Cost to Make Array Equal

## Weighted Median

Moving every element to a common target `t` costs `sum(|nums[i] - t| * cost[i])`, a piecewise-linear convex function of `t`: each element contributes a V-shaped term with slope `-cost[i]` left of its value and `+cost[i]` right of it. The total slope at `t` is the cost weight of elements below `t` minus the weight above, so the minimum sits where the cumulative weight crosses half the total — the weighted median. Any target away from that point has a nonzero slope that pushing toward the median reduces.

Concretely, the code sorts `(nums, cost)` pairs by value, sums all weights, and walks the sorted order accumulating cost until the running prefix reaches `ceil(total/2)`. The `nums` value at that crossing is the weighted median; using `>=` with `(total+1)//2` picks the lower median when the weight splits evenly, where either side gives the same cost. Elements already equal to the median contribute nothing, which handles the all-equal input for free.

A final linear pass evaluates `|num - median| * cost` for every pair. The target is always one of the existing values because the optimum of a convex piecewise-linear function over the integers lies at a breakpoint, so restricting the search to sorted `nums` values loses nothing.

Sorting dominates the runtime; the two scans are linear. Costs can sum to `10^5 * 10^6 * 10^6`-scale values, exceeding 32-bit range, which Python's arbitrary-precision integers handle without overflow.

**Complexity:** `O(n log n)` time, `O(n)` space.
