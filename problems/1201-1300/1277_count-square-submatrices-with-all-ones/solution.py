from typing import List, Optional


class Solution:
    def countSquares(self, matrix: List[List[int]]) -> int:
        m = len(matrix)
        n = len(matrix[0])
        total = 0
        # dp rows: side of the largest all-ones square whose bottom-right
        # corner sits at each cell; only the previous row is ever needed
        prev = [0] * n
        for i in range(m):
            cur = [0] * n
            for j in range(n):
                if not matrix[i][j]:
                    # a 0 cell ends no square; entry stays 0
                    continue
                if i == 0 or j == 0:
                    # no room to extend past the matrix edge
                    cur[j] = 1
                else:
                    # limited by the three neighbors: above, left, diagonal
                    cur[j] = min(prev[j], cur[j - 1], prev[j - 1]) + 1
                # a corner of max side k covers all k nested squares ending
                # there, so summing dp values counts every square exactly once
                total += cur[j]
            prev = cur
        return total
