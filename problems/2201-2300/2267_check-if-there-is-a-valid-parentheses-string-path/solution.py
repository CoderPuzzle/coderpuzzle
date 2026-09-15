from typing import List


class Solution:
    def hasValidPath(self, grid: List[List[str]]) -> bool:
        # dp[r][c] is the set of balances reachable at that cell, where the
        # balance counts '(' minus ')' along the path. A prefix whose balance
        # ever goes negative can never close into a valid string, so those
        # balances are dropped as each move is extended.
        m, n = len(grid), len(grid[0])
        start = 1 if grid[0][0] == "(" else -1
        if start < 0:
            return False
        dp = [[set() for _ in range(n)] for _ in range(m)]
        dp[0][0].add(start)
        for r in range(m):
            for c in range(n):
                for balance in dp[r][c]:
                    if r + 1 < m:
                        nb = balance + (1 if grid[r + 1][c] == "(" else -1)
                        if nb >= 0:
                            dp[r + 1][c].add(nb)
                    if c + 1 < n:
                        nb = balance + (1 if grid[r][c + 1] == "(" else -1)
                        if nb >= 0:
                            dp[r][c + 1].add(nb)
        return 0 in dp[m - 1][n - 1]
