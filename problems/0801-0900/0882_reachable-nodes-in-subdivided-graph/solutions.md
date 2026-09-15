# Solutions — Reachable Nodes In Subdivided Graph

## Dijkstra Plus Leftover-Move Counting

Subdividing an edge `[u, v, cnt]` turns it into a path of `cnt + 1` unit edges, so distances in the enormous subdivided graph can be computed on the compact original graph: run Dijkstra from node 0 with each edge weighted `cnt + 1`. The resulting `dist` array is the number of new nodes that must be traversed to reach each original node, and an original node is reachable exactly when its distance is at most `maxMoves`. Counting those nodes is the first half of the answer.

The second half counts reachable subdivision nodes, edge by edge. Standing at endpoint `u` with leftover budget `maxMoves - dist[u]`, you can walk that many new nodes into the chain from `u`'s side; the symmetric quantity from `v` covers nodes from the other end. The reachable count on the edge is `min(cnt, a + b)` — the `min` clamps away the double count when the two frontiers meet or overlap in the middle of the chain — and `max(0, ...)` makes unreachable endpoints (infinite distance) contribute nothing.

![The edge [0, 1, 10] as a chain of ten nodes, with frontiers of 6 and 1 meeting after 7 nodes.](figures/solution-subdivided-edge.svg)

Summing both parts gives the result. Edge cases: `maxMoves = 0` leaves only node 0; node 0 may be disconnected from the rest, in which case Dijkstra still returns `dist[0] = 0` while every edge contributes zero; and the lazy-deletion heap skip (`d != dist[u]`) keeps the heap-based variant correct.

**Complexity:** `O(E log N)` time, `O(N + E)` space.
