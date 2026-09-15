from typing import List


class Solution:
    def satisfiesConditions(self, grid: List[List[int]]) -> bool:
        # A grid meets both conditions exactly when every column is
        # constant and neighbouring columns differ. Once a column is
        # verified constant, comparing just its top cell with the next
        # column's top cell polices every vertical pair of the horizontal
        # rule at once, so one column-wise sweep suffices.
        for j in range(len(grid[0])):
            for i in range(1, len(grid)):
                if grid[i][j] != grid[0][j]:
                    return False
            if j + 1 < len(grid[0]) and grid[0][j] == grid[0][j + 1]:
                return False
        return True
