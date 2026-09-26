# Jump Game V

## Approach: Bottom-up DP in increasing height order

The recurrence is `dp[i] = 1 + max(dp[j])` over the indices reachable from
`i` in one jump, and every such `j` is strictly lower than `arr[i]`. So
processing the indices in increasing height order guarantees each index's
dependencies are already solved — no recursion, no memo table misses. The
answer is the maximum dp value.

![Height bars for arr = [6,4,14,6,8,13,9,7,10,6,12] with d = 2, dp filled in increasing-height order: the best chain 10 → 8 → 6 → 7 gives dp[10] = 4, and no jump crosses the 13 wall.](figures/solution-height-order-dp.svg)

Reachability is enumerated directly: walk right up to `d` steps, stopping
at the first index not strictly lower than `arr[i]` (that wall blocks all
farther jumps), then walk left the same way. Each walk is O(d), so the
whole pass is O(n·d) with n, d ≤ 1000.

**Complexity:** O(n·d) time, O(n) space.
