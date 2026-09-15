from typing import List


class Solution:
    def maxIncreasingCells(self, mat: List[List[int]]) -> int:
        # Chains only ever move to strictly greater values, so sweeping the
        # distinct values in ascending order lets every cell inherit the best
        # chain that already ends in its row or column among smaller values.
        # Cells sharing one value form a read-then-write batch: their answers
        # come from the row/column state before the batch, and the maxima
        # absorb the whole batch afterwards, since an equal-value cell can
        # never continue a chain.
        cells = sorted((v, r, c) for r, row in enumerate(mat) for c, v in enumerate(row))
        row_max = [0] * len(mat)
        col_max = [0] * len(mat[0])
        best = 0
        i = 0
        while i < len(cells):
            j = i  # run-length batch equal values: equal cells never chain
            while j < len(cells) and cells[j][0] == cells[i][0]:
                j += 1
            batch = [(max(row_max[r], col_max[c]) + 1, r, c) for _, r, c in cells[i:j]]
            for length, r, c in batch:
                if row_max[r] < length:
                    row_max[r] = length
                if col_max[c] < length:
                    col_max[c] = length
                if best < length:
                    best = length
            i = j
        return best
