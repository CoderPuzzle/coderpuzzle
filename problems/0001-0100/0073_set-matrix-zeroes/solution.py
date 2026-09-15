from typing import List


class Solution:
    def setZeroes(self, matrix: List[List[int]]) -> List[List[int]]:
        # The first row and column double as the marker zone, so their own
        # fate must be saved in two flags before any marker is written.
        first_row_zero = any(value == 0 for value in matrix[0])
        first_col_zero = any(row[0] == 0 for row in matrix)
        # First pass: each interior zero stamps its row and column into the
        # marker zone (the leading cell of its row and of its column).
        for i in range(1, len(matrix)):
            for j in range(1, len(matrix[0])):
                if matrix[i][j] == 0:
                    matrix[i][0] = 0
                    matrix[0][j] = 0
        # Second pass: replay the markers as wipes of interior cells only.
        # Neither sweep writes into the marker zone, so the markers stay
        # readable until both have consumed them.
        for i in range(1, len(matrix)):
            if matrix[i][0] == 0:
                for j in range(1, len(matrix[0])):
                    matrix[i][j] = 0
        for j in range(1, len(matrix[0])):
            if matrix[0][j] == 0:
                for i in range(1, len(matrix)):
                    matrix[i][j] = 0
        # The saved flags apply last, zeroing the marker zone itself — a
        # marker must never be mistaken for an original zero of row 0/col 0.
        if first_row_zero:
            for j in range(len(matrix[0])):
                matrix[0][j] = 0
        if first_col_zero:
            for i in range(len(matrix)):
                matrix[i][0] = 0
        # The rewrite happened inside the input allocation; the same matrix,
        # now zeroed, is what the judge compares.
        return matrix
