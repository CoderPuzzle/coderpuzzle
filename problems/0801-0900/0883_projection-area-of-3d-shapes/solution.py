from typing import List


class Solution:
    def projectionArea(self, grid: List[List[int]]) -> int:
        # The three projections never interact: the top view counts nonzero
        # cells, the other two are silhouettes of row and column maxima.
        # One row-major sweep banks the footprint and each row's tallest
        # tower; a second sweep collects the column maxima.
        n = len(grid)
        total = 0
        for row in grid:
            tallest = 0
            for v in row:
                if v != 0:
                    total += 1
                if v > tallest:
                    tallest = v
            total += tallest
        for j in range(n):
            tallest = 0
            for row in grid:
                if row[j] > tallest:
                    tallest = row[j]
            total += tallest
        return total
