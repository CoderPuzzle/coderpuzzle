# Solutions — Maximum Points After Collecting Coins From All Nodes

## Halving-state tree DP

Every node is collected exactly once, and the only interaction between
choices is downward: using the second way at a node halves the coins of
its whole subtree. Repeated floor-halving composes, so if t ancestors of
a node used the second way, its coin value is exactly `coins[v] >> t`,
and the t an ancestor passes down is just its own t plus one. A plan is
therefore a per-node choice, and the points a node earns depend only on
its coin, its choice, and t — points are additive. Since every coin is
below `2¹⁴` (coins ≤ 10⁴), a coin halved 14 times is 0 forever, so only
the states t = 0…14 matter: dp[x][t], the best total from x's subtree
when t ancestral halvings already apply, obeys

`dp[x][t] = max((coins[x] >> t) - k + Σ dp[y][t], (coins[x] >> (t + 1)) + Σ dp[y][t + 1])`

over the children y. The first term is the first way (the k loss is real
and may go negative), the second is the second way; state 14 absorbs to 0
because every remaining coin is 0 and the second way always yields at
least 0. The answer is dp[0][0].

The tree is rooted at 0 once with a BFS pass that fixes parents and a
top-down visit order; the dp then runs over the reverse order, with each
node accumulating its finalized dp row into its parent's per-state child
sum, so the Σ terms need no re-walk. Everything iterates over flat
arrays — a path tree reaches 10⁵ deep, which no recursive traversal may
be asked to survive.

Widening: the total is bounded by `n · max(coins) = 10⁵ · 10⁴ = 10⁹`,
which fits 32 bits but with thin margin, so Java, C++, Go, and Rust keep
the dp tables in a 64-bit type (`long`, `long long`, `int64`, `i64`).
Python integers are unbounded; JavaScript and TypeScript only shift
values ≤ 10⁴ and add up to 10⁹ < 2⁵³, so plain numbers are exact.

**Complexity:** `O(15 · n)` time, `O(15 · n)` space.
