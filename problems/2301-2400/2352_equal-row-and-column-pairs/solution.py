from typing import List


class Solution:
    def equalPairs(self, grid: List[List[int]]) -> int:
        # A pair (row, col) counts when both read as the identical sequence,
        # so hash each row once and look every column up in that multiset:
        # the count for a column is how many rows carry its exact sequence.
        n = len(grid)
        row_counts = {}
        for row in grid:
            key = tuple(row)
            row_counts[key] = row_counts.get(key, 0) + 1
        pairs = 0
        for c in range(n):
            column = tuple(grid[r][c] for r in range(n))
            pairs += row_counts.get(column, 0)
        return pairs
