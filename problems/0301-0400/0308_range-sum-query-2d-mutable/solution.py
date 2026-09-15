from typing import List


class NumMatrix:
    def __init__(self, matrix: List[List[int]]) -> None:
        self.m = len(matrix)
        self.n = len(matrix[0])
        self.matrix = [row[:] for row in matrix]
        # 2D Fenwick tree: cell (i, j) sums the rectangle i & -i rows tall
        # and j & -j columns wide ending at (i, j). 1-based in both dims,
        # row/column 0 unused so the low-bit arithmetic is valid.
        self.tree = [[0] * (self.n + 1) for _ in range(self.m + 1)]
        # O(m*n) build: each source row becomes a 1D Fenwick row in one
        # pass, every finished block pushed into its parent column.
        for i in range(1, self.m + 1):
            row = [0] * (self.n + 1)
            source = self.matrix[i - 1]
            for j in range(1, self.n + 1):
                row[j] += source[j - 1]
                parent = j + (j & -j)
                if parent <= self.n:
                    row[parent] += row[j]
            # The finished row is added into its own tree slot, then pushed
            # whole into the parent row's slot.
            tree_row = self.tree[i]
            for j in range(1, self.n + 1):
                tree_row[j] += row[j]
            parent_row = i + (i & -i)
            if parent_row <= self.m:
                target = self.tree[parent_row]
                for j in range(1, self.n + 1):
                    target[j] += tree_row[j]

    def update(self, row: int, col: int, val: int) -> None:
        # Only the delta is applied; the matrix copy keeps later deltas right.
        delta = val - self.matrix[row][col]
        self.matrix[row][col] = val
        # Dual climb over rows and columns visits exactly the tree cells
        # whose stored rectangle contains the updated cell.
        i = row + 1
        while i <= self.m:
            j = col + 1
            while j <= self.n:
                self.tree[i][j] += delta
                j += j & -j
            i += i & -i

    def sumRegion(self, row1: int, col1: int, row2: int, col2: int) -> int:
        # Inclusion-exclusion over four top-left-anchored prefix rectangles.
        return (
            self._prefix(row2 + 1, col2 + 1)
            - self._prefix(row1, col2 + 1)
            - self._prefix(row2 + 1, col1)
            + self._prefix(row1, col1)
        )

    def _prefix(self, rows: int, cols: int) -> int:
        total = 0
        # Strip low bits from the row index, and within each row strip from
        # the column index; the disjoint rectangles exactly tile the region.
        i = rows
        while i > 0:
            j = cols
            while j > 0:
                total += self.tree[i][j]
                j -= j & -j
            i -= i & -i
        return total
