# Solutions — Network Delay Time

Three classic shortest-path machinery choices, all reading the answer off
the same way: the time the signal needs is the maximum shortest distance
from `k`, or `-1` when some node never receives it.

## Dijkstra's Algorithm with a Min-Heap

The signal spreads through a directed weighted graph with non-negative weights, so the arrival time at each node is the classic single-source shortest distance from `k`, and the time until every node has heard the signal is the maximum of those distances. A heap-based Dijkstra computes all of them: the heap holds `(distance, node)` candidates, always popping the nearest unsettled node first, and a node is finalized the first time it is popped.

Stale heap entries are handled lazily: a pop that finds its node already in the settled dictionary is simply skipped, and neighbors that are already settled are not pushed again. Because all weights are non-negative, a node's first pop is provably its true shortest distance, which is what licenses settling it immediately and never revisiting it.

If the settled set ends up smaller than `n`, some node is unreachable from `k` and the answer is `-1`; otherwise it is the largest settled distance — the moment the last node receives the signal. With `V` nodes and `E` edges, building the adjacency list is linear and each edge causes at most one heap push, so the heap operations dominate.

**Complexity:** `O(E log E)` time, `O(V + E)` space.

## Bellman-Ford

No priority queue and no adjacency structure — just the flat edge list. Distances start at infinity except `dist[k] = 0`, and each round walks every edge `(u, v, w)` in place and relaxes `dist[v]` whenever `dist[u] + w` is smaller. Because relaxations compound within a round, one round extends the known shortest paths by at least one edge, so after `n - 1` rounds every shortest path (which spans at most `n - 1` edges) has been built — plain in-place relaxation, no frozen copy from the previous round.

Two conveniences follow. A round that relaxes nothing proves all distances are final, so the loop exits early; and the `dist[u]`-is-finite guard prevents the infinity sentinel from being arithmetic'd with weights, which keeps the overflow-prone languages honest. Afterwards the usual reading: any node still at infinity is unreachable from `k` (`-1`), otherwise the answer is the largest distance.

The `O(V·E)` cost is a few times ten thousand operations at `n <= 100` here, so the humble edge scan is perfectly comfortable — and unlike Dijkstra it would keep working if the weights were allowed to go negative.

**Complexity:** `O(V·E)` time, `O(V)` space.

## Floyd-Warshall

Instead of one source, compute everything at once. The graph becomes an `(n+1)×(n+1)` adjacency matrix — zero on the diagonal, infinity elsewhere, and the smallest weight when parallel edges repeat a pair — and a triple loop relaxes, for every midpoint `m`, every path `i → m → j` against the direct `d[i][j]`. After the outer loop has admitted each node as a midpoint in turn, `d[i][j]` is the true shortest distance for every pair simultaneously.

That breadth is overkill for a single source but costs nothing here: `n <= 100` makes the cubic loop about a million comparisons, comfortably inside the limits, and the infinity guards keep `INF + INF` from overflowing the integer sentinel in the languages without float infinities. The answer is then just row `k`: any infinity among `d[k][1..n]` means the signal never arrives (`-1`), otherwise the row's maximum is the moment the last node hears it.

**Complexity:** `O(n^3)` time, `O(n^2)` space.
