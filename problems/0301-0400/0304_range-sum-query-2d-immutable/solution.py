from typing import List


class NumMatrix:
    def __init__(self, matrix: List[List[int]]) -> None:
        rows, cols = len(matrix), len(matrix[0])
        # Integral image: prefix[r][c] sums rows 0..r-1 and columns
        # 0..c-1. The guard row and column of zeros remove every
        # boundary special case from the index arithmetic.
        self.prefix = [[0] * (cols + 1) for _ in range(rows + 1)]
        for r in range(rows):
            row_prefix = self.prefix[r + 1]
            above = self.prefix[r]
            for c in range(cols):
                # Inclusion-exclusion over three already-computed
                # neighbors; the top-left term is subtracted because
                # both the row strip and column strip contain it.
                row_prefix[c + 1] = matrix[r][c] + above[c + 1] + row_prefix[c] - above[c]

    def sumRegion(self, row1: int, col1: int, row2: int, col2: int) -> int:
        # The same inclusion-exclusion in reverse: the strips above and
        # left of the query cancel, leaving the rectangle in O(1).
        prefix = self.prefix
        return prefix[row2 + 1][col2 + 1] - prefix[row1][col2 + 1] - prefix[row2 + 1][col1] + prefix[row1][col1]
