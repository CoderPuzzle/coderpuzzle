# Solutions — Shortest Path with Alternating Colors

## BFS over (Node, Color) States

A plain BFS on the nodes fails because the shortest path to a node depends on the color of the edge used to enter it — the same node may need to be visited twice, once per incoming color, since the next edge must have the opposite color. The fix is to enlarge the state space: each state is a `(node, color)` pair meaning "standing on `node` having just arrived via a `color` edge", and the search runs a standard BFS over these `2n` states, which suffices for shortest paths on an unweighted graph.

The edges are split into two adjacency lists, one per color. Node 0 has no incoming edge, so the search seeds both states `(0, 0)` and `(0, 1)` at distance 0 — whichever color the first real edge must alternate from, one of the two seeds covers it. Popping `(node, color)` relaxes only the neighbors reachable via edges of the opposite color `1 - color`, recording `dist[nxt][1 - color]` the first time it is reached; first-time visits in a BFS are always at minimum distance, so an `INF` check doubles as the visited test. Self-edges and parallel edges need no special handling: a self-edge simply leads to a state already visited, and duplicates collapse in the distance check.

The per-node answer is the minimum over its two color states, taken on the fly: whenever a state distance is first set, `answer[nxt]` is lowered if it was already assigned. Nodes never reached in either color keep their initial `-1`, and `answer[0]` is fixed at 0 up front.

Each directed edge — over both colors, so `E` counts red and blue edges together — is examined at most once (from the single opposite-color state of its tail), and each state enters the queue at most once.

**Complexity:** `O(n + E)` time, `O(n + E)` space.
