# Solutions — Find Edges in Shortest Paths

## Dijkstra from both endpoints

An edge (u, v, w) lies on some shortest 0-to-(n-1) path exactly when the distance from 0 to one endpoint plus w plus the distance from the other endpoint to n-1 equals the total shortest-path length. That test needs only three numbers per edge, so the whole problem reduces to computing two distance arrays: dist0 from node 0 and distN from node n-1, each produced by a standard heap Dijkstra over the adjacency list (dist entries are finalized in increasing order; stale heap entries are skipped with the d != dist[u] check).

After the two runs, total = dist0[n - 1] is the reference length. If the graph is disconnected this value is infinite and no edge can qualify, so the method returns all false immediately. Otherwise each edge is checked in both orientations — dist0[u] + w + distN[v] == total or dist0[v] + w + distN[u] == total — because an undirected edge may be traversed in either direction along a shortest path.

![Example 1's graph with d0/d5 labels on every node; blue edges satisfy d0[u] + w + d5[v] = 5, dashed ones fail the test.](figures/solution-two-dijkstra.svg)

Correctness rests on the fact that any path through edge (u, v) splits at that edge: its length is (shortest 0-to-u) + w + (shortest v-to-n-1) or the mirrored sum, and equality with total is both necessary (each piece is at least the shortest distance) and sufficient (concatenating the three optimal pieces yields a genuine shortest path).

**Complexity:** `O((n + m) log n)` time, `O(n + m)` space.
