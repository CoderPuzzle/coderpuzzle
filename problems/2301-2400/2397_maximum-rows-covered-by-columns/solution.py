class Solution:
    def maximumRows(self, matrix: List[List[int]], numSelect: int) -> int:
        # Encode rows as bitmasks; a set of selected columns covers a
        # row exactly when the row's mask is a subset of it. Enumerate
        # every mask with popcount == numSelect and keep the best count.
        m, n = len(matrix), len(matrix[0])
        masks = []
        for row in matrix:
            mask = 0
            for j, v in enumerate(row):
                if v:
                    mask |= 1 << j
            masks.append(mask)
        best = 0
        for sel in range(1 << n):
            if sel.bit_count() != numSelect:
                continue
            covered = sum(1 for row in masks if row & ~sel == 0)
            best = max(best, covered)
        return best
