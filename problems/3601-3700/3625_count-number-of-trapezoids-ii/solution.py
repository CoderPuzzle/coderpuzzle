from typing import List
from collections import defaultdict
from math import gcd


class Solution:
    def countTrapezoids(self, points: List[List[int]]) -> int:
        # Hash every segment by its sign-fixed reduced slope, and within a
        # slope by its line intercept: two segments sharing a slope but
        # lying on different lines never share an endpoint and always span
        # a convex quadrilateral, while same-line pairs are degenerate. Per
        # slope the valid base-pairs are C(m,2) minus the same-line
        # C(c,2) sums. A parallelogram has two parallel-side pairs and is
        # therefore counted in two slope buckets; hashing segments by
        # diagonal midpoint (excluding equal-slope pairs, i.e. collinear
        # quadruples) counts each parallelogram exactly once, so one
        # subtraction makes every convex quad with parallel sides count
        # once. Bucket counts reach C(125000, 2) ~ 7.8e9, so 64-bit math.
        slope_lines = defaultdict(lambda: defaultdict(int))
        mid_slopes = defaultdict(lambda: defaultdict(int))
        n = len(points)
        for i in range(n):
            x1, y1 = points[i]
            for j in range(i + 1, n):
                x2, y2 = points[j]
                dx, dy = x2 - x1, y2 - y1
                g = gcd(abs(dx), abs(dy))
                dx, dy = dx // g, dy // g
                if dx < 0 or (dx == 0 and dy < 0):
                    dx, dy = -dx, -dy
                slope_lines[(dy, dx)][dx * y1 - dy * x1] += 1
                mid_slopes[(x1 + x2, y1 + y2)][(dy, dx)] += 1
        total = 0
        for lines in slope_lines.values():
            m = sum(lines.values())
            total += m * (m - 1) // 2
            for c in lines.values():
                total -= c * (c - 1) // 2
        parallelograms = 0
        for slopes in mid_slopes.values():
            c = sum(slopes.values())
            parallelograms += c * (c - 1) // 2
            for s in slopes.values():
                parallelograms -= s * (s - 1) // 2
        return total - parallelograms
