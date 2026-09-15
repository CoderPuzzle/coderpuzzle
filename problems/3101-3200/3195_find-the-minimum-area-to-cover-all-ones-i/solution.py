from typing import List


class Solution:
    def minimumArea(self, grid: List[List[int]]) -> int:
        # Every 1 must lie inside the answer, so the rectangle is pinned to
        # the topmost, bottommost, leftmost and rightmost 1; any smaller box
        # would exclude one of those extreme cells. One sweep tracking the
        # four extremes, jumping across each row via index lookups, is enough.
        min_row, max_row = len(grid), -1
        min_col, max_col = len(grid[0]), -1
        for i, row in enumerate(grid):
            if 1 not in row:
                continue
            min_row = min(min_row, i)
            max_row = i
            first = row.index(1)
            last = len(row) - 1 - row[::-1].index(1)
            min_col = min(min_col, first)
            max_col = max(max_col, last)
        return (max_row - min_row + 1) * (max_col - min_col + 1)
