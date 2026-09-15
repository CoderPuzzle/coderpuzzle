# Solutions — Swim in Rising Water

## Dijkstra minimizing the maximum elevation

Reframe the path cost: instead of summing edge weights, the time needed for a path is the maximum elevation along it, and the answer is the minimum such time over all paths from `(0, 0)` to `(n-1, n-1)`. This is a shortest-path problem under the "cost" operator `max`, which is monotone — extending a path can only keep or raise its time — so Dijkstra's greedy argument still applies with relaxation `next_time = max(current_time, grid[neighbor])`.

![The rim-hugging minimax path through the example grid; its bottleneck is the 16 at (2, 4).](figures/solution-spiral-path.svg)

`dist[r][c]` holds the earliest time cell `(r, c)` can be reached; it starts at `grid[0][0]` because you must wait for the start cell itself to clear. A min-heap keyed by time pops cells in nondecreasing order of earliest reachability; stale entries (whose recorded time exceeds the settled `dist`) are skipped. Each pop relaxes the four neighbors, pushing a neighbor whenever its best time improves.

The first time the bottom-right cell is popped, its key is the answer, because Dijkstra settles cells in order of their true optimal value — anything still in the heap is no better. A `1 x 1` grid returns `grid[0][0]` immediately since the start is the target. Correctness over the max-operator relies on the fact that a prefix's cost never decreases when the path grows, mirroring the nonnegative-weight condition in ordinary Dijkstra.

**Complexity:** `O(n^2 log n)` time for an `n x n` grid (each cell pushed a bounded number of times), `O(n^2)` space for the distance matrix and heap.
