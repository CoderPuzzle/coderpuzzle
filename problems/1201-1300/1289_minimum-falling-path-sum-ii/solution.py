from typing import List, Optional


class Solution:
    def minFallingPathSum(self, grid: List[List[int]]) -> int:
        n = len(grid)
        prev = list(grid[0])
        for i in range(1, n):
            # Two smallest values of the previous row (min2 used when j is min1's index).
            min1 = float("inf")
            min2 = float("inf")
            idx1 = -1
            for j, v in enumerate(prev):
                if v < min1:
                    min2 = min1
                    min1 = v
                    idx1 = j
                elif v < min2:
                    min2 = v
            cur = [grid[i][j] + (min2 if j == idx1 else min1) for j in range(n)]
            prev = cur
        return min(prev)
