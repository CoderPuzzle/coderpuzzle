from typing import List, Optional


class Solution:
    def separateSquares(self, squares: List[List[int]]) -> float:
        total = sum(l * l for _, _, l in squares)
        target = total / 2.0
        # area below a horizontal line is non-decreasing in its height, so
        # binary search the smallest y whose below-area reaches half the total
        lo = 0.0
        hi = float(max(y + l for _, y, l in squares))
        # 60 halvings shrink the interval well below the 1e-5 tolerance
        for _ in range(60):
            mid = (lo + hi) / 2.0
            below = 0.0
            # each square contributes width * height clipped to [0, l]
            for x, y, l in squares:
                if mid <= y:
                    continue
                below += (min(mid, y + l) - y) * l
            # >= steers the search to the leftmost qualifying height
            if below >= target:
                hi = mid
            else:
                lo = mid
        return hi
