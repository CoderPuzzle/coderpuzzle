from typing import List, Optional


class Solution:
    def areaOfMaxDiagonal(self, dimensions: List[List[int]]) -> int:
        # Compare diagonals through their squares (l^2 + w^2): squares
        # order diagonals identically and stay exact in integers, so no
        # square roots or float rounding anywhere. Ties on the diagonal
        # fall through to the larger area.
        best_diag = 0
        best_area = 0
        for length, width in dimensions:
            diag = length * length + width * width
            area = length * width
            if (diag, area) > (best_diag, best_area):
                best_diag, best_area = diag, area
        return best_area
