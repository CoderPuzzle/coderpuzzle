# Solutions — Maximum Number of Points From Grid Queries

## Sorted Queries with a Min-Heap Frontier

For a query value `q`, the cells collected are exactly those reachable from the top-left corner through a path of cells whose values are all strictly less than `q` — reachability, not path length, decides the score. This reachable set only grows as `q` grows, so instead of running an independent BFS per query, sort the queries ascending (keeping original indices) and expand one frontier incrementally, answering each query from the running visited count.

![Grid snapshots at q = 2, 5 and 6 showing popped cells, the heap frontier, and unreached cells with counts 1, 5 and 8.](figures/solution-heap-frontier.svg)

The frontier lives in a min-heap keyed by cell value, seeded with the start cell and marked visited. For the current query `q`, pop while the heap minimum is strictly below `q`: each popped cell adds one point and pushes its unvisited in-bounds neighbors. This is Dijkstra-like expansion in order of cell value, which guarantees a cell enters the frontier as soon as some query could ever reach it, and each cell is pushed and popped exactly once across the entire run. When the heap minimum is `>= q`, no further cell is reachable for this or any smaller remaining query, so `count` is the answer for that index and is written into `answer[idx]`.

Queries equal to or below the start cell's value score 0 — the loop body never runs and the start cell is never popped. Marking cells visited at _push_ time (not pop time) prevents duplicate heap entries and keeps the heap size bounded by the grid size. Since queries are processed in ascending order, the visited state is fully reusable between them; only the per-index bookkeeping is per-query.

**Complexity:** `O(mn log(mn) + k log k)` time, `O(mn)` space.
