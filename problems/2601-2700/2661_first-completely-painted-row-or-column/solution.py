from typing import List


class Solution:
    def firstCompleteIndex(self, arr: List[int], mat: List[List[int]]) -> int:
        # Precompute where every value lives, then replay arr bumping each
        # cell's row and column counter; a counter reaching its width or
        # height means that line just finished painting.
        m, n = len(mat), len(mat[0])
        position = {}
        for r in range(m):
            for c in range(n):
                position[mat[r][c]] = (r, c)
        row_fill = [0] * m
        column_fill = [0] * n
        for index, value in enumerate(arr):
            r, c = position[value]
            row_fill[r] += 1
            column_fill[c] += 1
            if row_fill[r] == n or column_fill[c] == m:
                return index
        return -1
