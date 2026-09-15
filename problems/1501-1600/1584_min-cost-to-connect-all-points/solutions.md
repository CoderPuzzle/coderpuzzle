# Solutions — Min Cost to Connect All Points

## Prim's Minimum Spanning Tree

Connecting all points at minimum total edge cost is exactly the minimum spanning tree problem on the complete graph whose edge weights are Manhattan distances. With up to 1000 points the graph is dense, so an adjacency-free `O(n²)` Prim is both simple and asymptotically optimal — building an explicit edge list would already cost `O(n²)`.

The algorithm grows one tree from point 0. It keeps `best[v]`, the cheapest Manhattan distance from any tree vertex to an outside vertex `v`, and a `used` flag per vertex. Each of the `n` rounds scans all vertices to pick the unused vertex `u` with the smallest `best`, adds `best[u]` to the total, marks it used, and then relaxes every remaining outside vertex against `u`'s distances. Each round therefore costs `O(n)` for the scan plus `O(n)` for the relaxation.

![The example points with the four minimum spanning tree edges drawn in blue, numbered in the order Prim picks them: (0,0)-(2,2) at cost 4, (2,2)-(5,2) at 3, (5,2)-(7,0) at 4, and (2,2)-(3,10) at 9, totalling 20.](figures/solution-prim-tree.svg)

Correctness is Prim's cut property: at every step the cheapest edge leaving the current tree is safe to add, so after `n` rounds the accumulated total is the MST weight. The `n <= 1` guard returns 0 immediately, and `best[0] = 0` makes the first pick free so the starting point contributes no cost.

**Complexity:** `O(n²)` time, `O(n)` space.
