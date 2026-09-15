# Solutions — Largest Color Value in a Directed Graph

## Topological sort with per-color DP

The state `dp[u][c]` is the maximum number of color-`c` nodes on any path ending at `u`. This is well-defined only if every predecessor of `u` has been finalized first, which is exactly what a topological order provides: Kahn's algorithm processes `u` only after its in-degree drops to zero, i.e. after all edges into it have been relaxed, so the counts pushed out of `u` are final.

Processing a node is three small steps. Its own color's counter is incremented (the node itself extends every incoming path). The best entry in its 26-slot row is a candidate answer, since a valid path may end at any node — this is what lets single-node paths count. Then the row is element-wise max-merged into each neighbor's row, the edge is consumed, and any neighbor whose in-degree hits zero joins the queue.

Cycles reveal themselves at the end: nodes on or downstream of a cycle never reach in-degree zero, so if the number of visited nodes is less than `n` the answer is `-1`. An acyclic single node with no edges is handled naturally (it is enqueued immediately and yields answer 1). The 26-way merge is the dominant cost, done once per edge.

**Complexity:** `O(26(n + m))` time, `O(26n + m)` space.
