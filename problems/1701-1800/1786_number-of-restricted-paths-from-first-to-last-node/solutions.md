# Solutions — Number of Restricted Paths From First to Last Node

## Dijkstra from the last node, then a distance-ordered DP

Every edge `[u, v, w]` is directed from its farther endpoint to its nearer
one, with respect to `distanceToLastNode`; when the two endpoints tie, the
edge is discarded, because a restricted path must strictly decrease that
distance at every step. The directed graph that survives is acyclic — an
edge always points to a strictly smaller distance — and its paths from `1`
to `n` are exactly the restricted paths, so counting them is a DAG path
count.

One Dijkstra run from node `n` yields all the distances: nodes are settled
by increasing distance out of a binary heap, with stale heap entries
skipped rather than decreased. Seeding `count[n] = 1` and then visiting the
nodes in increasing distance order makes every contribution final by the
time it is read: when node `u` is visited, each strictly-closer neighbor
`v` was already visited, so `count[u]` is the sum of `count[v]` over those
neighbors, reduced modulo `10⁹ + 7`.

Distances are held in 64-bit integers: a shortest path uses at most `n - 1`
edges of weight up to `10⁵`, so a distance can reach about `2 * 10⁹`,
grazing the 32-bit ceiling (plain JavaScript numbers hold it exactly, being
far below `2⁵³`). Counts stay below the modulus, so the answer fits in a
32-bit integer.

**Complexity:** `O((n + m) log n)` time, `O(n + m)` space.
