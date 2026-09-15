from typing import List


class Solution:
    def largestLocal(self, grid: List[List[int]]) -> List[List[int]]:
        # Two passes shrink the window work from 9 comparisons per output
        # cell to 6: first collapse every row of 3 horizontally, then take
        # the vertical max of those results.
        n = len(grid)
        row_max = [[max(grid[i][j], grid[i][j + 1], grid[i][j + 2]) for j in range(n - 2)] for i in range(n)]
        return [[max(row_max[i][j], row_max[i + 1][j], row_max[i + 2][j]) for j in range(n - 2)] for i in range(n - 2)]
