from typing import List, Optional


class Solution:
    def countPaths(self, grid: List[List[int]]) -> int:
        MOD = 10**9 + 7
        m, n = len(grid), len(grid[0])
        # Process cells in decreasing value order: when (i, j) is handled,
        # every strictly larger neighbor's dp entry is already final.
        cells = sorted(
            ((grid[i][j], i, j) for i in range(m) for j in range(n)),
            reverse=True,
        )
        # dp[i][j] = number of increasing paths starting at (i, j);
        # 1 accounts for the length-1 path of the cell itself.
        dp = [[1] * n for _ in range(m)]
        for v, i, j in cells:
            for di, dj in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                ni, nj = i + di, j + dj
                # Strict '>' skips equal-value neighbors, so plateau cells
                # never chain (an increasing path can never revisit a cell).
                if 0 <= ni < m and 0 <= nj < n and grid[ni][nj] > v:
                    dp[i][j] = (dp[i][j] + dp[ni][nj]) % MOD
        # A path is identified by its starting cell, so sum dp everywhere.
        return sum(sum(row) for row in dp) % MOD
