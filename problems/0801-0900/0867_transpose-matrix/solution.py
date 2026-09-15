from typing import List


class Solution:
    def transpose(self, matrix: List[List[int]]) -> List[List[int]]:
        # The transpose swaps indices: the entry at (i, j) moves to (j, i),
        # so every input row reappears as an output column. A non-square
        # input changes shape — m x n becomes n x m — so the result is a
        # fresh grid, never an in-place rewrite.
        m, n = len(matrix), len(matrix[0])
        result: List[List[int]] = [[0] * m for _ in range(n)]
        for i in range(m):
            for j in range(n):
                result[j][i] = matrix[i][j]
        return result
