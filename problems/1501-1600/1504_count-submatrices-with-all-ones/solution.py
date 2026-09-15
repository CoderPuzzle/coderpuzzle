from typing import List, Optional


class Solution:
    def numSubmat(self, mat: List[List[int]]) -> int:
        m = len(mat)
        n = len(mat[0]) if m else 0
        total = 0
        # height[c]: run of consecutive ones ending at the current row in
        # column c — extended by a one, reset to zero by a zero.
        height = [0] * n
        for r in range(m):
            for c in range(n):
                if mat[r][c] == 1:
                    height[c] += 1
                else:
                    height[c] = 0
            # Anchor submatrices at their bottom row: a span [left, right]
            # admits exactly min(height) of them (every height up to the
            # minimum works), and each submatrix has a unique bottom row and
            # span, so nothing is double-counted.
            for left in range(n):
                min_h = height[left]
                # Widening the span can only lower the minimum, so one
                # running variable tracks it.
                for right in range(left, n):
                    if height[right] < min_h:
                        min_h = height[right]
                    total += min_h
        return total
