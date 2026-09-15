# Solutions — Count Sub Islands

## Flood Fill with a Sub-Island Check

The key observation removes any need to match islands between the two grids: an island in `grid2` is a sub-island exactly when every one of its land cells is also land in `grid1`. Since those cells are 4-connected in `grid2`, they are also 4-connected in `grid1`, so they all belong to a single island of `grid1`, which by definition contains the whole `grid2` island. Conversely, if any cell of the `grid2` island is water in `grid1`, no `grid1` island can cover it. The problem therefore reduces to flood-filling each island of `grid2` and running a per-cell membership test against `grid1`.

The solution scans `grid2` row by row. Whenever it finds a land cell that a `seen` matrix has not yet marked, it flood-fills the entire island containing that cell using an explicit stack rather than recursion — with grids up to 500×500 a recursive flood fill could blow the interpreter's recursion limit. As each cell is popped, the code checks `grid1[x][y]`; a single miss clears the `is_sub` flag for the whole island. Neighbors are pushed only when they are in bounds, land in `grid2`, and unseen, and they are marked at push time so no cell is ever enqueued twice.

![The example grids side by side: grid2's six-cell top island, the lone cell at (3, 0), and the cell at (4, 1) are entirely covered by grid1 land and count as sub-islands, while the island at (2, 1) and the one at (3, 2)-(3, 3)-(4, 3) each contain a cell that is water in grid1, marked with an X.](figures/solution-sub-island-check.svg)

If the flood fill finishes with `is_sub` still true, the island is counted. Edges are handled naturally: cells outside the grid are never pushed, so an island touching the border is treated as bounded by water on that side, and the `seen` marks persist across islands so overlapping scans never double-count. Each cell of `grid2` is visited a constant number of times overall.

**Complexity:** `O(m·n)` time, `O(m·n)` space.
