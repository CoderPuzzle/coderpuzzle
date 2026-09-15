from typing import List, Optional


class Solution:
    def numberOfPaths(self, grid: List[List[int]], k: int) -> int:
        MOD = 10**9 + 7
        m = len(grid)
        n = len(grid[0])
        # dp[j][v] = paths reaching column j whose sum is v (mod k). When
        # cell (i, j) is computed, dp[j] still holds the row above and
        # dp[j-1] already holds the current row's left neighbor.
        dp = [None] * n
        for i in range(m):
            for j in range(n):
                g = grid[i][j] % k
                if i == 0 and j == 0:
                    # Seed: the single corner path has remainder g.
                    first = [0] * k
                    first[g] = 1
                    dp[j] = first
                    continue
                cur = [0] * k
                # A path arriving with remainder r leaves with (r + g) % k,
                # so target v pulls from incoming (v - g) mod k.
                if i > 0 and dp[j] is not None:
                    above = dp[j]
                    for v in range(k):
                        cur[v] = above[(v - g) % k]
                if j > 0 and dp[j - 1] is not None:
                    left = dp[j - 1]
                    for v in range(k):
                        cur[v] = (cur[v] + left[(v - g) % k]) % MOD
                dp[j] = cur
        # Answer = remainder-0 paths reaching the bottom-right cell.
        return dp[n - 1][0] % MOD
