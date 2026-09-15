from typing import List


class Solution:
    def canPartitionGrid(self, grid: List[List[int]]) -> bool:
        # One cut splits the grid into a run of whole rows or whole
        # columns, so scan run-prefix sums for total / 2. Totals reach
        # 1e5 cells x 1e5 = 1e10 — beyond 32 bits, but Python ints are
        # arbitrary precision and exact.
        total = sum(sum(row) for row in grid)
        if total % 2:
            return False
        half = total // 2
        prefix = 0
        for row in grid[:-1]:
            prefix += sum(row)
            if prefix == half:
                return True
        prefix = 0
        for c in range(len(grid[0]) - 1):
            prefix += sum(row[c] for row in grid)
            if prefix == half:
                return True
        return False
