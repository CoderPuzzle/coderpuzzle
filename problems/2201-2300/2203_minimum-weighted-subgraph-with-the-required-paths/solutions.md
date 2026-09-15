# Solutions — Minimum Weighted Subgraph With the Required Paths

## Three Dijkstra runs on forward and reverse graphs

In an optimal subgraph the paths from `src1` and `src2` to `dest` first behave independently and then coincide: they meet at some node `v` and share the segment from `v` to `dest`, because if the two paths crossed they could be re-spliced at the crossing point without increasing total weight. So the answer is `min over v of dist(src1, v) + dist(src2, v) + dist(v, dest)`, where shared edges after the meeting point are naturally counted once in this sum since all three distances are computed independently and added — the meeting node absorbs the overlap.

The trick that makes this computable is running the third search on the reversed graph: `dist(v, dest)` in the original graph equals `dist(dest, v)` when every edge `u -> v` is also stored as `v -> u`. The code therefore builds both an adjacency list and a reverse adjacency list in one pass over `edges`, then runs Dijkstra three times — from `src1` and `src2` on the forward graph, and from `dest` on the reverse graph. Weights are positive, so the lazy-delete heap version (skip a popped entry whose recorded distance is stale) is correct.

The final sweep takes the minimum of `d1[v] + d2[v] + dd[v]` over every node `v` that the reverse search could reach, and this filtering is what makes `-1` detection work: a node with `dd[v] == inf` can never lie on any valid subgraph and is excluded outright, while a node reachable from `dest` but unreachable from `src1` or `src2` contributes an infinite sum, which is caught by the explicit `best == float("inf")` check. The `default = -1` argument to `min` additionally handles the degenerate case of an empty edge list where no candidate exists at all. With `E = edges.length`, each Dijkstra costs `O((n + E) log n)` and the sweep is a single `O(n)` pass.

**Complexity:** `O((n + E) log n)` time, `O(n + E)` space.
