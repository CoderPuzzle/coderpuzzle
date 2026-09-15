# Solutions — Multi Source Flood Fill

## Multi-Source BFS

Simultaneous spreading is exactly what BFS layers model: a cell's final color is decided by the earliest time step at which any color reaches it, with ties broken in favor of the maximum color value. The solution therefore seeds one queue with all source cells at distance 0, each carrying its own color into the grid, and lets the frontier expand outward in all four directions at once.

When a cell at distance `d` is popped, each in-bounds neighbor is either still unvisited — in which case it gets distance `d + 1`, inherits the cell's color, and is enqueued — or it already has distance `d + 1`, meaning it was first reached earlier in this very time step by a different color, so the two colors are compared and the larger one is kept. The tie update never re-enqueues the neighbor, so each cell enters the queue exactly once.

A subtle point makes this correct: the queue's distances are nondecreasing, so every cell that can still raise a neighbor's color sits one layer earlier and is processed before that neighbor is ever popped. Hence a cell's color is final by the time it spreads, and its children receive the correct winning color even when the cell itself won a tie after being enqueued.

![The 3x3 grid of example 1 at t = 0, 1 and 2: both frontiers grow one ring per step and the three contested cells take the max color 2.](figures/solution-flood-layers.svg)

Edge cases are handled by the same sweep: a single source simply floods the whole grid with one color (the grid is connected under 4-adjacency, so the loop drains only after every cell is colored), and the constraint `n * m <= 10^5` keeps the visited arrays and queue comfortably small.

**Complexity:** `O(n * m)` time, `O(n * m)` space.
