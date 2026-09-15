# Solutions — Minimum Partition Score II

Use Lagrangian relaxation to remove the partition-count dimension, and a
monotone convex hull to evaluate every relaxed dynamic program in linear time.

## Penalty search with a monotone convex hull

Let `P[i]` be the prefix sum and first minimize the sum of squared block sums;
the requested score is that minimum plus `P[n]`, divided by two. Add an integer
penalty `lambda` for every block. The relaxed transition is
`dp[i] = P[i]² + lambda + min(dp[j] + P[j]² - 2P[i]P[j])`. Each previous
position supplies a line of slope `-2P[j]`; because positive inputs make both
prefix sums and inserted slopes monotone, a deque hull answers all queries in
linear time. Alongside each cost, keep the number of blocks and prefer more
blocks on equal cost.

As `lambda` grows, an optimal relaxed solution uses no more blocks. Binary
search the largest penalty whose tie-broken optimum uses at least `k` blocks.
Discrete convexity of the block-sum-square objective makes this a supporting
slope for the exactly-`k` optimum, so subtracting `lambda * k` from the
relaxed result recovers its exact squared-sum cost. Integer breakpoints between
lines avoid overflowing cross products; all actual costs stay within signed
64-bit bounds, while JavaScript implementations use `BigInt` internally.

**Complexity:** `O(n log S)` time, `O(n)` space, where `S` is the total sum.
