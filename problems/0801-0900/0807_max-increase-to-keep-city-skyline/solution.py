from typing import List


class Solution:
    def maxIncreaseKeepingSkyline(self, grid: List[List[int]]) -> int:
        # Seen along one axis of the city, every row collapses to its
        # tallest building, and seen along the other, every column does —
        # those 2n maxima are all four skylines hold. A raise is safe
        # exactly while the building stays at or below both of its
        # maxima, so the shorter of the two is each cell's ceiling and
        # the answer is the total gap below it.
        n = len(grid)
        row_max = [max(row) for row in grid]
        col_max = [max(col) for col in zip(*grid)]
        return sum(min(row_max[r], col_max[c]) - grid[r][c] for r in range(n) for c in range(n))
