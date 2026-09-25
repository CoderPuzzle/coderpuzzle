# Solutions — Unique Paths II

## Dynamic programming, one rolling row

Every path into a cell arrives by exactly one of two moves, from the cell above or from the cell to the left, so the number of ways to reach `(i, j)` is the sum of the ways to reach those two neighbors. An obstacle breaks the recurrence at a single point: no path may stand on it, so its count is pinned to 0, and the cells that would have drawn from it simply receive nothing. The start carries one path unless it is itself an obstacle.

Because each row of the count table depends only on the row above, the m x n grid of counts collapses to one row that is reused as the scan moves down. The row is seeded with a single path at column 0 of a virtual row above the grid; then, per grid row, an obstacle zeroes its cell, and every other cell adds `dp[j - 1]` — the paths arriving from the left — onto the value already sitting in `dp[j]`, which is exactly the paths arriving from above. After the last row, `dp[n - 1]` is the answer.

![On obstacleGrid [[0,0,0],[0,1,0],[0,0,0]] the rolling dp row goes [1,1,1] then [1,0,1] then [1,1,2]: the obstacle pins its cell to 0 and the bottom-right accumulates 2.](figures/solution-rolling-row-obstacle-zero.svg)

The statement caps the answer at `2 * 10⁹`; the fixed-width languages carry the row in 64-bit integers so the accumulation never rides that ceiling.

**Complexity:** `O(mn)` time, `O(n)` space.
