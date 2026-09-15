from typing import List, Optional


class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        # One rolling row, seeded with the all-ones counts of the first row.
        row = [1] * n
        for _ in range(1, m):
            # row[j] still holds the count from the cell above while row[j-1]
            # was already rewritten this pass, so += applies paths = up + left.
            for j in range(1, n):
                row[j] += row[j - 1]
        return row[-1]
