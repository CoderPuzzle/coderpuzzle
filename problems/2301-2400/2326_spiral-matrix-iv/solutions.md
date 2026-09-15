# Solutions — Spiral Matrix IV

## Direction-vector walk

The matrix starts filled with `-1`, which serves both as the required
empty-space value and as the unvisited marker. A cursor begins at the
top-left cell and advances along a clockwise cycle of directions — right,
down, left, up — writing the next linked-list value at each stop. Before
every move it inspects the candidate cell: if that cell falls outside the
grid or has already been written, the direction vector is rotated 90
degrees clockwise once and the move is retried from the same cell.

The walk stops the moment the list runs out of nodes, so it touches exactly
as many cells as there are nodes; every cell left unwritten keeps its `-1`.
Each step costs constant work — one write plus at most one bounds-and-marker
check per candidate — independent of the matrix size.

**Complexity:** `O(m * n)` time, `O(1)` extra space beyond the output.
