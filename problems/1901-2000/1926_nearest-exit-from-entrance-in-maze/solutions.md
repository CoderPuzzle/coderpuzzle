# Solutions — Nearest Exit from Entrance in Maze

## Breadth-First Search

Every move costs exactly one step, so the maze is an unweighted grid graph and breadth-first search from the entrance visits cells in order of increasing distance. The first border cell that BFS dequeues — other than the entrance itself — is therefore a nearest exit, and its recorded distance is the answer.

The search keeps a `dist` matrix initialized to -1 (doubling as the visited set), sets the entrance to 0, and processes a deque. The exit test `(i == 0 or i == m-1 or j == 0 or j == n-1) and (i, j) != (er, ec)` runs when a cell is popped, not when it is pushed: the entrance is frequently on the border, and testing on pop cleanly excludes it while still returning the correct step count for any other border cell reached later. Neighbors are enqueued only when in bounds, empty (`'.'`), and previously unseen; distances are assigned at enqueue time, which is what makes the queue ordered by distance.

![The example maze with BFS distances from the entrance E at (1, 2): the upward neighbor settles at distance 1 and is the first border cell dequeued, while the left exit is only reached at distance 2 and the bottom-right exit stays sealed off by walls.](figures/solution-maze-bfs.svg)

If the queue drains without any exit being dequeued, no reachable exit exists and the function returns -1 — this covers the single-cell-corridor case where every border cell other than the entrance is a wall. Wall cells are never entered, so they cost nothing beyond the bounds/character check, and each cell is enqueued at most once.

**Complexity:** `O(m·n)` time, `O(m·n)` space.
