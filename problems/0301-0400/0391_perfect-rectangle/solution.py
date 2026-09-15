from typing import List


class Solution:
    def isRectangleCover(self, rectangles: List[List[int]]) -> bool:
        # Two signatures of an exact cover, gathered in one pass: the piece
        # areas must sum to the bounding rectangle's area, and every interior
        # corner cancels, leaving exactly the bounding box's four corners.
        area = 0
        min_x = min_y = float("inf")
        max_a = max_b = float("-inf")
        corners = set()
        for x, y, a, b in rectangles:
            area += (a - x) * (b - y)
            min_x, min_y = min(min_x, x), min(min_y, y)
            max_a, max_b = max(max_a, a), max(max_b, b)
            # Toggle: add when absent, remove when present, so a corner
            # shared by 2 or 4 pieces vanishes instead of accumulating.
            for corner in ((x, y), (x, b), (a, y), (a, b)):
                if corner in corners:
                    corners.remove(corner)
                else:
                    corners.add(corner)
        return corners == {(min_x, min_y), (min_x, max_b), (max_a, min_y), (max_a, max_b)} and area == (
            max_a - min_x
        ) * (max_b - min_y)
