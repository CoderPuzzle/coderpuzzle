# Solutions — Shortest Path in Binary Matrix

## Breadth-First Search

Every move between adjacent cells costs exactly one step regardless of direction, so the graph over the zero cells is unweighted and BFS explores it in strictly increasing order of path length — the first arrival at any cell is provably along a shortest path. The eight-directional neighborhood (including diagonals) is enumerated by the nested (−1, 0, 1) offset loops, skipping the (0, 0) no-move.

The code guards the degenerate cases before searching: if either corner is blocked the answer is −1, and a 1×1 grid with a single open cell is a path of length 1 with no moves needed. Otherwise BFS starts at (0, 0) with distance 1 (length counts visited cells, not edges) and stores distances directly in a matrix, which doubles as the visited marker — a cell is enqueued only when its stored distance is still 0, so each cell enters the queue at most once.

![The example grid with BFS distances; diagonal moves shorten the path to 4 cells.](figures/solution-bfs-grid.svg)

The search returns early the moment a neighbor expansion would step onto the bottom-right cell, reporting the current cell's distance plus one; if the queue drains first, no clear path exists and the result is −1. Both the distance matrix and the queue are bounded by the number of cells.

**Complexity:** `O(n²)` time, `O(n²)` space.
