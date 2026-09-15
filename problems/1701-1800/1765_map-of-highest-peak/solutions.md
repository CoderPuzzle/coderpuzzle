# Solutions — Map of Highest Peak

## Multi-Source BFS from Water

The two rules squeeze every cell from both sides: adjacent cells may differ in height by at most 1 and water cells sit at height 0, so any land cell's height is at most its Manhattan-path distance to the nearest water cell. Assigning each cell exactly that nearest-water distance therefore achieves the largest possible height everywhere at once — every constraint still holds because neighboring cells' nearest-water distances differ by at most 1 (a shortest path to one of them passes through the other), and the maximum height in the matrix is as large as any valid assignment can make it.

This is a multi-source shortest-path problem on an unweighted grid, solved by one breadth-first search that starts from all water cells simultaneously. The code scans the matrix, sets every water cell's height to 0, and enqueues them all; BFS then processes cells in order of distance, assigning each newly reached neighbor `height[i][j] + 1`. The `height` matrix, initialized to `-1`, doubles as the visited marker, so every cell is enqueued exactly once and gets the distance of the first (nearest) source to reach it.

![The example 3x3 map with both water cells settled at height 0 in dark blue, the first BFS ring at height 1, and the far corner peaking at height 2 — each cell holds its distance to the nearest water.](figures/solution-water-wavefront.svg)

Because the grid is 4-connected and finite, BFS reaches every cell, and the guarantee of at least one water cell means the initial queue is non-empty. Landlocked maps with distant corners naturally receive the largest heights, which is exactly the maximization the problem asks for, and tie-breaking "smallest height possible" is automatic since no cell can go below its nearest-water distance.

**Complexity:** `O(mn)` time, `O(mn)` space.
