from typing import List


class Solution:
    def uniquePaths(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        MOD = 1_000_000_007
        # Landing tables for mirror cells: entering a mirror while moving
        # right (br) turns the move down, while moving down (bd) turns it
        # right; -1 marks a chain that leaves the grid. Each deflection
        # lands one row below or one column right of the mirror hit, so a
        # reverse row-major sweep resolves every chain against entries that
        # are already final.
        br = [-1] * (m * n)
        bd = [-1] * (m * n)
        for i in range(m - 1, -1, -1):
            row = grid[i]
            for j in range(n - 1, -1, -1):
                if row[j] == 0:
                    continue
                t = i * n + j
                if i + 1 < m:
                    u = t + n
                    br[t] = u if grid[i + 1][j] == 0 else bd[u]
                if j + 1 < n:
                    u = t + 1
                    bd[t] = u if row[j + 1] == 0 else br[u]
        # dp[k] counts the ways to stand on cell k. Every jump lands in a
        # strictly later row than the cell it leaves, so one row-major sweep
        # settles each cell before any descendant reads it.
        dp = [0] * (m * n)
        dp[0] = 1
        for i in range(m):
            base = i * n
            row = grid[i]
            for j in range(n):
                v = dp[base + j]
                if v == 0:
                    continue
                if j + 1 < n:
                    t = base + j + 1
                    tgt = br[t] if row[j + 1] else t
                    if tgt >= 0:
                        dp[tgt] = (dp[tgt] + v) % MOD
                if i + 1 < m:
                    t = base + n + j
                    tgt = bd[t] if grid[i + 1][j] else t
                    if tgt >= 0:
                        dp[tgt] = (dp[tgt] + v) % MOD
        return dp[m * n - 1]
