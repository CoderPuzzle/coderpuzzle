from typing import List


class Solution:
    def isToeplitzMatrix(self, matrix: List[List[int]]) -> bool:
        # A diagonal from top-left to bottom-right is constant exactly
        # when every cell equals its top-left neighbor — that neighbor is
        # the previous cell of the same diagonal, so a break anywhere on
        # a diagonal surfaces as one failed neighbor check. Cells in row
        # 0 and column 0 start their diagonals and have no top-left
        # neighbor, so the sweep opens at row 1, column 1.
        for r in range(1, len(matrix)):
            row, prev = matrix[r], matrix[r - 1]
            for c in range(1, len(row)):
                if row[c] != prev[c - 1]:
                    return False
        return True
