# Solutions — Number of Ways to Arrive at Destination

## Dijkstra with Path Counting

The solution is Dijkstra's single-source shortest-path algorithm from node 0, augmented with a parallel `ways` array: `ways[v]` counts the number of distinct shortest paths from 0 to `v`, reduced modulo `10^9 + 7`. Both quantities are maintained together as edges are relaxed. The adjacency list is built as undirected since every road can be traveled both ways.

When relaxing an edge `u -> v` with weight `t`, three cases arise. If `d + t` is strictly smaller than the best known `dist[v]`, a shorter route has been discovered, so `dist[v]` is overwritten and `ways[v]` is reset to `ways[u]` — all previously counted paths are now obsolete. If `d + t` equals `dist[v]`, the edge extends an equally short route, so `ways[u]` is added into `ways[v]` modulo the prime. Nothing happens otherwise. Because all road times are positive, a node is finalized (popped with `d == dist[u]`) only after every shortest path into it has been relaxed, so `ways[u]` is complete at that moment; the `d > dist[u]` check discards stale heap entries from earlier, longer estimates.

The answer is `ways[n - 1]`. Self-loops cannot occur (`u != v` is guaranteed) and the graph is connected, so every node, including the destination, is reached and finalized exactly once with its path count complete.

**Complexity:** `O(E log V)` time, `O(V + E)` space.
