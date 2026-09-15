from typing import List


class Solution:
    def maxRectangleArea(self, points: List[List[int]]) -> int:
        # Enumerate every quadruple. Four distinct points are the corners of
        # an axis-aligned rectangle exactly when they use two distinct x
        # values and two distinct y values — the four (x, y) combos then
        # each hold one of the points. The rectangle survives only if every
        # other point lies outside its closed box; with n <= 10 there are at
        # most C(10,4) = 210 quads, each checked in a linear scan.
        n = len(points)
        best = -1
        for i in range(n):
            for j in range(i + 1, n):
                for k in range(j + 1, n):
                    for l in range(k + 1, n):
                        quad = (points[i], points[j], points[k], points[l])
                        xs = {p[0] for p in quad}
                        ys = {p[1] for p in quad}
                        if len(xs) != 2 or len(ys) != 2:
                            continue
                        x1, x2 = min(xs), max(xs)
                        y1, y2 = min(ys), max(ys)
                        if all(not (x1 <= p[0] <= x2 and y1 <= p[1] <= y2) for p in points if p not in quad):
                            best = max(best, (x2 - x1) * (y2 - y1))
        return best
