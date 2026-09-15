from typing import List, Optional


class Solution:
    def diagonalSum(self, mat: List[List[int]]) -> int:
        n = len(mat)
        total = 0
        for i in range(n):
            total += mat[i][i]
            j = n - 1 - i
            # the two diagonals meet at the center of an odd-sized matrix;
            # only add the mirror cell when it is a different position
            if j != i:
                total += mat[i][j]
        return total
