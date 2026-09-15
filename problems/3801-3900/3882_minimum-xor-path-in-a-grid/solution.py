from typing import List, Optional


class Solution:
    def minCost(self, grid: List[List[int]]) -> int:
        # Every cell value is at most 1023 (10 bits), so any path XOR is in
        # 0..1023. reach[i][j][x] records whether a path ending at (i, j)
        # can achieve XOR x.
        m, n = len(grid), len(grid[0])
        reach = [[[False] * 1024 for _ in range(n)] for __ in range(m)]
        reach[0][0][grid[0][0]] = True
        for i in range(m):
            for j in range(n):
                if i == 0 and j == 0:
                    continue
                v = grid[i][j]
                for x in range(1024):
                    if (i > 0 and reach[i - 1][j][x]) or (j > 0 and reach[i][j - 1][x]):
                        reach[i][j][x ^ v] = True
        # The smallest reachable XOR at the bottom-right cell is the answer.
        for x in range(1024):
            if reach[m - 1][n - 1][x]:
                return x
        return -1
