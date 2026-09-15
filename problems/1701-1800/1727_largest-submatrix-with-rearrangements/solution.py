from typing import List, Optional


class Solution:
    def largestSubmatrix(self, matrix: List[List[int]]) -> int:
        m = len(matrix)
        if m == 0:
            return 0
        n = len(matrix[0])
        heights = [0] * n
        best = 0
        for row in matrix:
            # heights[j] = run of consecutive ones ending at this row.
            for j in range(n):
                heights[j] = heights[j] + 1 if row[j] == 1 else 0
            # Columns may be rearranged, so only the multiset of heights
            # matters; descending order puts the (i+1)-th tallest run at i.
            ordered = sorted(heights, reverse=True)
            # The top i+1 columns all reach height ordered[i], and the
            # rearrangement places them side by side — width i+1 is real.
            for i, h in enumerate(ordered):
                # Descending order: everything after a zero is zero too.
                if h == 0:
                    break
                area = h * (i + 1)
                if area > best:
                    best = area
        return best
