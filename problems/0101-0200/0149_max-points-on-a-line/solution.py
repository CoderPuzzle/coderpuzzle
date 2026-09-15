from math import gcd
from typing import List


class Solution:
    def maxPoints(self, points: List[List[int]]) -> int:
        # Anchor each point in turn and bucket every later point by the
        # direction from the anchor: on any one line through the anchor all
        # other members share that direction, and the best line is counted
        # in full when the anchor is its earliest point.
        best = 1
        for i, (x0, y0) in enumerate(points):
            counts = {}
            for x1, y1 in points[i + 1 :]:
                dx, dy = x1 - x0, y1 - y0
                # Reduce to lowest terms, then canonicalize the sign so the
                # two readings of one line collapse onto a single key:
                # exact integers, never a floating-point slope.
                g = gcd(dx, dy)
                dx, dy = dx // g, dy // g
                if dx < 0 or (dx == 0 and dy < 0):
                    dx, dy = -dx, -dy
                counts[(dx, dy)] = counts.get((dx, dy), 0) + 1
            if counts:
                best = max(best, 1 + max(counts.values()))
        return best
