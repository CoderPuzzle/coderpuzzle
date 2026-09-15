from typing import List


class Solution:
    def maxSum(self, grid: List[List[int]]) -> int:
        # Every hourglass is the top and bottom rows of a 3x3 submatrix
        # plus its center cell, so one pass over all top-left corners of
        # such submatrices visits each hourglass exactly once.
        best = 0
        for r in range(len(grid) - 2):
            for c in range(len(grid[0]) - 2):
                current = (
                    grid[r][c]
                    + grid[r][c + 1]
                    + grid[r][c + 2]
                    + grid[r + 1][c + 1]
                    + grid[r + 2][c]
                    + grid[r + 2][c + 1]
                    + grid[r + 2][c + 2]
                )
                if current > best:
                    best = current
        return best
