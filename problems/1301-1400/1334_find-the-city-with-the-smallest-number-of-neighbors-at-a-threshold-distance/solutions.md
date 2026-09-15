# Solutions — Find the City With the Smallest Number of Neighbors at a Threshold Distance

Both answers rest on the same table: every neighborhood question is a
shortest-path question, and `n` is small enough to afford all the pairwise
distances at once. Floyd-Warshall fills the table as one waypoint DP, paying
the same cube however many edges the graph has. Dijkstra from every node
fills it a row at a time, settling each source's distances with a heap and
charging only for edges actually present.

## Floyd-Warshall All-Pairs Distances

With at most 100 cities, the cheapest way to know every city's neighborhood radius is to compute all-pairs shortest distances at once. The distance matrix starts with 0 on the diagonal, the direct edge weights (symmetric, since edges are bidirectional), and infinity elsewhere; a triple loop over intermediate node `k` relaxes `dist[i][j]` with `dist[i][k] + dist[k][j]`. After n passes, `dist[i][j]` is the true shortest path cost, and any pair still at infinity is genuinely disconnected. The `dik == INF` guard skips inner loops that cannot improve anything, a constant-factor trim on the standard algorithm.

The selection pass then counts, for each city i, how many other cities satisfy `dist[i][j] <= distanceThreshold`. Scanning i in increasing order and replacing the best on a strictly smaller count — or an equal count at a larger index — implements the tie-break: among cities with the same neighborhood size, the greatest number wins. Since the scan ascends, a later equal-count city always supersedes an earlier one.

Weights are strictly positive, so a city never counts itself (its self-distance is 0 but the counter excludes j == i explicitly). Disconnected graphs cause no trouble: unreachable pairs simply stay above the threshold.

**Complexity:** `O(n³)` time, `O(n²)` space.

## Dijkstra from Every Node

Floyd-Warshall's cube never asks how many edges the graph has; this variant
does. Mirror each undirected edge both ways into an adjacency list, then let
every node run its own single-source search: tentative distances start at 0
for the source and infinity elsewhere, and a min-heap always offers the
closest unsettled node.

Positive weights are the whole licence for the greed. The smallest tentative
distance on the heap is already final — any other route to that node must
leave through a node at least as far — so each pop settles one node for
good. Settling a node relaxes its edges, re-queueing a neighbor only when the
route through it strictly improves the record; heap entries that went stale
before a shorter route was found are discarded by a `d > dist` guard, and a
node still at infinity when the heap empties is genuinely disconnected.

Each finished run contributes one row of the same table Floyd-Warshall would
have filled, so the selection pass is unchanged: the neighborhood size is
the count of entries at or below `distanceThreshold`, the zero at the source excluded,
and the ascending scan with equal-count replacement keeps node 3 in the
first example just the same — the distances are the distances, whichever
method produced them. The trade behind the placement is the heap's log
factor against the cube's indifference to density: sparse graphs win big,
and even the complete graph at `n = 100` is a few million cheap heap
operations.

**Complexity:** `O(n (E + n) log n)` time, `O(n + E)` space.
