from typing import List, Optional


class Solution:
    def countPathsWithXorValue(self, grid: List[List[int]], k: int) -> int:
        MOD = 1_000_000_007
        m = len(grid)
        n = len(grid[0])
        # dp[i][j][x] = number of paths from (0,0) to (i,j) whose XOR is x
        dp = [[[0] * 16 for _ in range(n)] for _ in range(m)]
        dp[0][0][grid[0][0]] = 1
        for i in range(m):
            for j in range(n):
                if i == 0 and j == 0:
                    continue
                cell = grid[i][j]
                for x in range(16):
                    total = 0
                    if i > 0:
                        total += dp[i - 1][j][x ^ cell]
                    if j > 0:
                        total += dp[i][j - 1][x ^ cell]
                    dp[i][j][x] = total % MOD
        return dp[m - 1][n - 1][k]
