from typing import List


class Solution:
    def minFlips(self, grid: List[List[int]]) -> int:
        # Each mirrored pair that disagrees costs exactly one flip; agreeing
        # pairs and any middle cell never do.
        m, n = len(grid), len(grid[0])
        rows = cols = 0
        for row in grid:
            lo, hi = 0, n - 1
            while lo < hi:
                if row[lo] != row[hi]:
                    rows += 1
                lo += 1
                hi -= 1
        for j in range(n):
            lo, hi = 0, m - 1
            while lo < hi:
                if grid[lo][j] != grid[hi][j]:
                    cols += 1
                lo += 1
                hi -= 1
        return min(rows, cols)
