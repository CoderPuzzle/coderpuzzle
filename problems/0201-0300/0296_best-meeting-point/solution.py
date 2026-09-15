from typing import List


class Solution:
    def minTotalDistance(self, grid: List[List[int]]) -> int:
        # A row-major sweep collects the row indexes already sorted; a
        # column-major sweep does the same for the column indexes, so
        # neither axis needs an explicit sort.
        rows = [r for r in range(len(grid)) for c in range(len(grid[0])) if grid[r][c] == 1]
        cols = [c for c in range(len(grid[0])) for r in range(len(grid)) if grid[r][c] == 1]
        # Manhattan distance adds the two axes independently, and on a line a
        # median of the coordinates minimizes the sum of absolute differences
        # — so the answer is the two spreads around the two medians.
        row_pivot = rows[len(rows) // 2]
        col_pivot = cols[len(cols) // 2]
        # With an even count, every index between the two middle ones ties
        # for the minimum; the upper middle is as good as any.
        return sum(abs(r - row_pivot) for r in rows) + sum(abs(c - col_pivot) for c in cols)
