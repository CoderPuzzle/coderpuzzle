# Solutions — Cherry Pickup II

## Synchronized Two-Robot Dynamic Programming

Both robots descend exactly one row per step, so they always share the same row index and the complete state of the pair after r rows is just their two column positions. Let dp[c1][c2] be the maximum number of cherries collected when the robots stand in row r at columns c1 and c2. Optimizing the robots one at a time fails because they interact — a cell both visit is counted only once — so the pair must be optimized jointly.

![The two robots' column tracks through the example grid, harvesting 12 + 12 = 24.](figures/solution-robot-paths.svg)

The table is initialized with row 0: robot 1 sits at column 0 and robot 2 at the last column, and when the grid has a single column both start there and the initial cell is counted once. The table then rolls forward row by row. Each new entry scans the nine combinations of the two previous columns (each robot moves by -1, 0, or +1), takes the best reachable predecessor, and adds the new row's harvest — the cell's cherries are added twice, except when both robots land on the same cell, where they are added once.

States that cannot be reached are kept at minus infinity and propagate through the max, so they never contaminate the real optimum; the guard that skips entries with no finite predecessor keeps them out of the table entirely. Both robots must reach the bottom row, and since every move goes strictly downward all paths have identical length, so the answer is simply the largest value in the final row's table.

**Complexity:** `O(rows · cols²)` time, `O(cols²)` space.
