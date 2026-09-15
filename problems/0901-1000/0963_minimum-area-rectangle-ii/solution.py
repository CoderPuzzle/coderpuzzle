import math
from typing import List


class Solution:
    def minAreaFreeRect(self, points: List[List[int]]) -> float:
        # A quadrilateral is a rectangle exactly when its two diagonals
        # bisect each other (shared midpoint) and have equal length:
        # bisection makes it a parallelogram, and equal diagonals make a
        # parallelogram rectangular. So every pair of points is hashed as a
        # candidate diagonal keyed by (doubled midpoint, squared length) —
        # doubled so the key stays integral when the true midpoint is
        # half-integral — and a key collision hands over both diagonals of
        # a rectangle whose four corners are all present.
        n = len(points)
        diagonals = {}
        best2 = 0
        for i in range(n):
            x1, y1 = points[i]
            for j in range(i + 1, n):
                x2, y2 = points[j]
                key = (x1 + x2, y1 + y2, (x1 - x2) ** 2 + (y1 - y2) ** 2)
                for rx, ry in diagonals.get(key, ()):
                    # The stored endpoint r marks one diagonal; its
                    # reflection through the shared midpoint marks the
                    # other. The rectangle's sides at (x1, y1) run to r and
                    # to that reflection, whose offset is (x2 - rx, y2 - ry).
                    ux, uy = rx - x1, ry - y1
                    vx, vy = x2 - rx, y2 - ry
                    area2 = (ux * ux + uy * uy) * (vx * vx + vy * vy)
                    if best2 == 0 or area2 < best2:
                        best2 = area2
                diagonals.setdefault(key, []).append((x1, y1))
        # A lattice rectangle's area is always an integer — perpendicular
        # integer side vectors make the product of squared side lengths a
        # perfect square — so the minimum squared area has an exact integer
        # root, and an integer at most 1.6 * 10^9 converts to float exactly.
        return float(math.isqrt(best2))
