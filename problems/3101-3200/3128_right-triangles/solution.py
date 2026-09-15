from typing import List


class Solution:
    def numberOfRightTriangles(self, grid: List[List[int]]) -> int:
        # Every right triangle has a unique corner cell: its horizontal leg
        # endpoint and vertical leg endpoint can be picked independently
        # from the other 1s in that row and column. A collinear triple never
        # qualifies, so the corner count is exact. The maximum
        # 10^6 * 999 * 999 ~ 10^12 needs 64-bit accumulation.
        rows = len(grid)
        cols = len(grid[0])
        row_ones = [sum(r) for r in grid]
        col_ones = [sum(grid[r][c] for r in range(rows)) for c in range(cols)]
        total = 0
        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == 1:
                    total += (row_ones[r] - 1) * (col_ones[c] - 1)
        return total
