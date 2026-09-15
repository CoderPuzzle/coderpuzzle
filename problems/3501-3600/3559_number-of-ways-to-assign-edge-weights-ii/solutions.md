# Solutions — Number of Ways to Assign Edge Weights II

## LCA distance, then 2^(d-1)

Part I's parity argument carries over per query: on a path of `d` edges,
weights of 2 never move the parity, so the cost is odd exactly when an odd
number of the `d` edges carry weight 1 — `2^(d-1)` assignments for `d >= 1`
and 0 for the empty path `u = v`. Every query therefore reduces to the
path length, and in a tree that is
`d = depth[u] + depth[v] - 2 * depth[lca(u, v)]`.

The LCA comes from binary lifting. One explicit-stack traversal roots the
tree at node 1 and records `depth` and `parent` (recursion is not an
option: a degenerate chain runs `10⁵` deep); the jump table `up[k]` is then
filled row by row, `up[k][v] = up[k-1][up[k-1][v]]`, with node 0 acting as
the "above the root" sentinel. Each query lifts the deeper endpoint by the
depth difference bit by bit, then descends from the top bit to find the
highest rung on which the two endpoints still differ — O(log n) per query
over a precomputed powers-of-2 table, so the whole batch runs in
`O((n + q) log n)`.

**Complexity:** `O((n + q) log n)` time, `O(n log n)` space.
