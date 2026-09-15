from typing import List, Optional


class Solution:
    def computeArea(self, ax1: int, ay1: int, ax2: int, ay2: int, bx1: int, by1: int, bx2: int, by2: int) -> int:
        # Inclusion-exclusion: the covered total is both areas minus their
        # intersection, since everything outside the intersection is
        # already counted exactly once.
        area_a = (ax2 - ax1) * (ay2 - ay1)
        area_b = (bx2 - bx1) * (by2 - by1)
        # The intersection of two axis-aligned rectangles is itself one:
        # its x-span runs from the outermost left edge to the innermost
        # right edge, and likewise for y. A negative span on either axis
        # means the projections miss and no rectangle is shared at all.
        overlap_w = min(ax2, bx2) - max(ax1, bx1)
        overlap_h = min(ay2, by2) - max(ay1, by1)
        if overlap_w > 0 and overlap_h > 0:
            return area_a + area_b - overlap_w * overlap_h
        # Disjoint rectangles, or ones merely touching along an edge or a
        # corner, share zero area and need no subtraction.
        return area_a + area_b
