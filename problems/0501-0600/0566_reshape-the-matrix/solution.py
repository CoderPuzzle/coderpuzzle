from typing import List


class Solution:
    def matrixReshape(self, mat: List[List[int]], r: int, c: int) -> List[List[int]]:
        # A reshape can only permute elements, never create or destroy them,
        # so the target is legal exactly when the areas agree; any mismatch
        # returns the original matrix untouched.
        m, n = len(mat), len(mat[0])
        if r * c != m * n:
            return mat
        reshaped: List[List[int]] = [[0] * c for _ in range(r)]
        # One flat index drives both sides: element i sits at mat[i // n][i % n]
        # in the source and belongs at reshaped[i // c][i % c] in the target,
        # so reading i = 0 .. m*n - 1 fills the target in row-traversing order.
        for i in range(m * n):
            reshaped[i // c][i % c] = mat[i // n][i % n]
        return reshaped
