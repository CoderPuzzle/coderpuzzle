from typing import List


class Solution:
    def rotate(self, matrix: List[List[int]]) -> List[List[int]]:
        # Transpose across the main diagonal: swapped pairs sit on opposite
        # sides of it, so scanning j from i + 1 swaps every pair exactly once.
        n = len(matrix)
        for i in range(n):
            for j in range(i + 1, n):
                matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
        # A clockwise quarter turn maps column j (read bottom-up) onto row j,
        # which is exactly the transposed matrix with every row reversed.
        for row in matrix:
            row.reverse()
        # The rotation happened inside the input allocation; the same matrix,
        # now rotated, is what the judge compares.
        return matrix
