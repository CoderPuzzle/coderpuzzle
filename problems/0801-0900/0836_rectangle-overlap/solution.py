from typing import List


class Solution:
    def isRectangleOverlap(self, rec1: List[int], rec2: List[int]) -> bool:
        # A positive-area intersection needs positive width and positive
        # height at the same time. The shared x-span runs from the larger
        # left edge to the smaller right edge, so it is positive exactly
        # when each left edge lies strictly left of the other rectangle's
        # right edge; the y-axis repeats the story with bottom and top
        # edges. The comparisons are strict on purpose: equality means the
        # rectangles merely share an edge or a corner, which is not an
        # overlap. Only comparisons, never subtraction — no overflow.
        return rec1[0] < rec2[2] and rec2[0] < rec1[2] and rec1[1] < rec2[3] and rec2[1] < rec1[3]
