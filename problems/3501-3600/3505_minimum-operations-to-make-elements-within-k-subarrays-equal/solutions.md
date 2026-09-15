# Solutions — Minimum Operations to Make Elements Within K Subarrays Equal

Making one x-sized window all equal to a common value t costs
sum(|v - t|), which is minimized when t is a median of that window. The
task needs k non-overlapping such windows, so two pieces combine: a
sliding structure that reports every window's median cost in logarithmic
time, and a selection DP that chooses the cheapest k disjoint windows.

## Sliding-window median costs and a selection DP

For each start position the window's cost is precomputed with a sliding
window held in a Fenwick tree over compressed values. Adding the entering
value and deleting the leaving one are O(log n) prefix updates; `kth`
locates the median value, and prefix count/sum queries split the window
into its at-or-below-median and above-median halves, so each window's cost
`median * cntLow - sumLow + sumHigh - median * (x - cntLow)` is
constant-time arithmetic once the tree is updated. Window costs reach
`x * 2 * 10^6 = 2 * 10^11`, past 32-bit range, so every accumulator and
the answer are 64-bit throughout.

With `cost[i]` known, choosing k non-overlapping windows is a selection
DP: `dp[t][i]` is the cheapest way to place t windows among start
positions up to i, taking the minimum of skipping position i or starting
a window there — which forces the previous t - 1 windows to end before
`i - x`. The transition only reads the previous layer, so a rolling pair
of arrays gives O(k * n) time, and since k <= 15 that is effectively
linear in n.

**Complexity:** `O(n log n)` time, `O(n)` space.
