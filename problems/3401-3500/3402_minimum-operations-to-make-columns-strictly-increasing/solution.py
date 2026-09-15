from typing import List


class Solution:
    def minimumOperations(self, grid: List[List[int]]) -> int:
        # Columns are independent: a cell only has to top the cell directly
        # above it, so one top-to-bottom sweep settles everything. Raising
        # each cell to exactly one above the cell above is the pointwise
        # minimum final column, so no cheaper fix exists.
        previous = list(grid[0])
        operations = 0
        for row in grid[1:]:
            for j, value in enumerate(row):
                if value <= previous[j]:
                    operations += previous[j] + 1 - value
                    previous[j] += 1
                else:
                    previous[j] = value
        return operations
