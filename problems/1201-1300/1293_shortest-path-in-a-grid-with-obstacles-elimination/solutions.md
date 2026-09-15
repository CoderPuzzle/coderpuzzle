# Solutions — Shortest Path in a Grid with Obstacles Elimination

## BFS on Augmented States

Plain BFS over cell coordinates is insufficient here, because two paths can arrive at the same cell with different amounts of elimination budget left, and the one that spent more budget may be the only one that can still finish. So the visited unit is a triple `(x, y, remaining)`: the position plus how many obstacle eliminations are still allowed. Stepping into a cell costs `grid[nx][ny]` of the budget, and moves that would drive `remaining` below zero are discarded. BFS explores this augmented graph level by level, so the first time the bottom-right cell is dequeued, the level counter is the minimum number of steps.

![The example grid: eliminating the obstacle at (3, 2) lets a 6-step state path reach the corner.](figures/solution-obstacle-path.svg)

One shortcut short-circuits the search entirely: if `k >= m + n − 2`, the answer is directly `m + n − 2`, because a monotone (only right and down) path has exactly `m + n − 2` cells after the start and can eliminate every obstacle it meets. This also implicitly caps the state space, since the BFS branch only runs when k is below that bound, keeping `remaining` in a small range.

Each state enters the queue at most once (it is marked seen on enqueue), and each dequeued state expands four neighbors with O(1) work. The 1×1 grid is handled naturally: the start state is the target, so it returns 0 on the first dequeue. If the queue drains without reaching the target, no feasible walk exists and −1 is returned.

**Complexity:** `O(m · n · k)` time, `O(m · n · k)` space.
