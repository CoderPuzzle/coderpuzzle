from typing import List


class Solution:
    def diagonalSort(self, mat: List[List[int]]) -> List[List[int]]:
        # Cells on one diagonal share i - j, so bucket by that difference,
        # sort each bucket, and scatter back along the same walk.
        m, n = len(mat), len(mat[0])
        out = [[0] * n for _ in range(m)]
        for start_i in range(m):
            for start_j in range(n):
                if start_i > 0 and start_j > 0:
                    continue  # interior cells extend an earlier diagonal
                diag = []
                i, j = start_i, start_j
                while i < m and j < n:
                    diag.append(mat[i][j])
                    i += 1
                    j += 1
                diag.sort()
                i, j = start_i, start_j
                for value in diag:
                    out[i][j] = value
                    i += 1
                    j += 1
        return out
