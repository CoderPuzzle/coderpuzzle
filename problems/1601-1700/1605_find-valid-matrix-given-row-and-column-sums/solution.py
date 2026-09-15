class Solution:
    def restoreMatrix(self, rowSum: list[int], colSum: list[int]) -> list[list[int]]:
        rows, cols = len(rowSum), len(colSum)
        remaining_row = rowSum[:]
        remaining_col = colSum[:]
        matrix = [[0] * cols for _ in range(rows)]
        for i in range(rows):
            for j in range(cols):
                value = min(remaining_row[i], remaining_col[j])
                matrix[i][j] = value
                remaining_row[i] -= value
                remaining_col[j] -= value
        return matrix
