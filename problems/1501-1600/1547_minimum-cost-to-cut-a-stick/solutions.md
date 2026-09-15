# Solutions — Minimum Cost to Cut a Stick

## Interval Dynamic Programming

Add the two stick ends `0` and `n` to the cut positions and sort them, giving an ordered list of `m + 2` boundaries (with `m = len(cuts)`). Any cutting order induces a binary recursion: the first cut inside a segment splits it into two independent subproblems, and the cost of that first cut is the segment's full length, `positions[j] - positions[i]`.

Define `dp[i][j]` as the minimum total cost to perform all cuts strictly between boundaries `i` and `j`. The recurrence tries every boundary `k` with `i < k < j` as the first cut: `dp[i][j] = min(dp[i][k] + dp[k][j]) + (positions[j] - positions[i])`. Segments with no interior cut (`j = i + 1`) cost 0. The answer is `dp[0][m + 1]`, the whole stick.

![The example stick with boundaries 0, 1, 3, 4, 5, 7 and the recursion the optimal cut order induces: the first cut 3 splits the whole stick into [0,3] and [3,7], and each bar below pays its own length — 7, then 4 and 3, then 2 — for a total of 16.](figures/solution-interval-tree.svg)

The table is filled by increasing segment length so both subproblems are already solved when a larger interval needs them. Sorting the cuts up front is essential because the optimal order is free while the input order is not, and the sentinel endpoints guarantee the outermost segments are handled uniformly. Duplicate cuts never occur, and the trivial case of a single cut resolves as `n` plus two empty subproblems.

**Complexity:** `O(m³)` time, `O(m²)` space, where `m` is the number of cuts.
