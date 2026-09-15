from typing import List


class Solution:
    def countGoodRectangles(self, rectangles: List[List[int]]) -> int:
        # Each rectangle independently caps a square at side min(l, w),
        # so the answer is the largest of those minima and how many
        # rectangles attain it: reset the count on a new maximum,
        # increment it on a tie.
        best_side = 0
        count = 0
        for length, width in rectangles:
            side = min(length, width)
            if side > best_side:
                best_side = side
                count = 1
            elif side == best_side:
                count += 1
        return count
