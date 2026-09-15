from typing import List, Optional


class Solution:
    def numSubmatrixSumTarget(self, matrix: List[List[int]], target: int) -> int:
        rows = len(matrix)
        cols = len(matrix[0])

        # vertical prefix sums: vpref[r][c] = sum of column c over rows [0, r-1]
        vpref = [[0] * cols for _ in range(rows + 1)]
        for r in range(rows):
            for c in range(cols):
                vpref[r + 1][c] = vpref[r][c] + matrix[r][c]

        count = 0
        for top in range(rows):
            for bottom in range(top, rows):
                hist = {0: 1}
                running = 0
                for c in range(cols):
                    col_sum = vpref[bottom + 1][c] - vpref[top][c]
                    running += col_sum
                    count += hist.get(running - target, 0)
                    hist[running] = hist.get(running, 0) + 1
        return count
