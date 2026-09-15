from typing import List, Optional


class Solution:
    def countSubmatrices(self, grid: List[List[int]], k: int) -> int:
        rows, cols = len(grid), len(grid[0])
        # col_sums[j] accumulates column j over rows 0..i, so a submatrix
        # anchored at (0, 0) is identified by its bottom-right corner (i, j).
        col_sums = [0] * cols
        count = 0
        for i in range(rows):
            prefix = 0
            for j in range(cols):
                col_sums[j] += grid[i][j]
                # prefix is the rectangle sum grid[0..i][0..j].
                prefix += col_sums[j]
                # Values are non-negative, so sums only grow with j: once the
                # prefix exceeds k, every further corner in this row fails too.
                if prefix > k:
                    break
                count += 1
        return count
