from typing import List


class Solution:
    def fallingSquares(self, positions: List[List[int]]) -> List[int]:
        # Coordinate compression: every left and right edge becomes a cell
        # boundary, so each square's footprint is a run of compressed cells
        # and touching edges share no cell — exactly the brushing rule.
        # Heights stay in i32 range: at most 1000 * 10**6 = 10**9 < 2**31.
        coords = sorted({x for left, side in positions for x in (left, left + side)})
        index = {x: i for i, x in enumerate(coords)}
        # heights[k] is the top height over the cell [coords[k], coords[k+1]).
        heights = [0] * len(coords)
        ans: List[int] = []
        best = 0
        for left, side in positions:
            lo, hi = index[left], index[left + side]
            # The square lands on the tallest top among the cells it covers.
            top = side + max(heights[lo:hi])
            for cell in range(lo, hi):
                heights[cell] = top
            best = max(best, top)
            ans.append(best)
        return ans
