from typing import List


class Solution:
    def oddCells(self, m: int, n: int, indices: List[List[int]]) -> int:
        row_odd = [False] * m
        col_odd = [False] * n
        for r, c in indices:
            # Only parity survives; the cell value is row count + column count.
            row_odd[r] = not row_odd[r]
            col_odd[c] = not col_odd[c]
        odd_rows = sum(row_odd)
        odd_cols = sum(col_odd)
        return odd_rows * (n - odd_cols) + (m - odd_rows) * odd_cols
