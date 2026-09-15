from typing import List


class Solution:
    def minPathSum(self, grid: List[List[int]]) -> int:
        # The grid doubles as the DP table: after the scan, grid[i][j] holds
        # not the cell's own value but the cheapest path sum from (0, 0)
        # reaching it, so no second table is ever allocated.
        m, n = len(grid), len(grid[0])
        # The first row and the first column have a single predecessor each,
        # so their running sums are plain prefixes along that row/column.
        for j in range(1, n):
            grid[0][j] += grid[0][j - 1]
        for i in range(1, m):
            grid[i][0] += grid[i - 1][0]
            for j in range(1, n):
                # Cheapest sum ending at (i, j) = the cell's own value plus
                # the smaller of the sums already sitting above and left.
                grid[i][j] += min(grid[i - 1][j], grid[i][j - 1])
        return grid[m - 1][n - 1]
