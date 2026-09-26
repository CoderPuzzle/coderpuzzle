# Solutions — Check if There is a Valid Path in a Grid

## Mutual-side BFS over street openings

Encode each of the six streets as the two grid sides it opens (for example a `3` opens west and south). A step between adjacent cells is then a purely local rule: the current cell must open the shared side, and the neighbour must open the opposite side, so both streets genuinely meet end to end. Every other transition is a wall.

![Example 1's grid [[2, 4, 3], [6, 5, 2]] with every street's two openings drawn as blue bars: the numbered BFS arrows step only through sides both cells open, popping all six cells to reach (1, 2) and return true.](figures/solution-mutual-side-bfs.svg)

With that rule in hand the question becomes ordinary reachability, solved by a breadth-first flood from `(0, 0)`: pop a cell, try its two open sides, and enqueue each mutually-connected neighbour not yet seen. The walk stops with `true` the moment `(m - 1, n - 1)` is popped, or with `false` when the queue drains first. BFS keeps the stack flat, which matters on a 300 × 300 grid where a recursive DFS could chase a path thousands of cells deep.

Each cell enters the queue at most once and tries at most two sides, and the visited matrix is the only auxiliary state.

**Complexity:** `O(m·n)` time, `O(m·n)` space.
