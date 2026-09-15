from typing import List


class Solution:
    def outerTrees(self, trees: List[List[int]]) -> List[List[int]]:
        points = sorted(set((x, y) for x, y in trees))
        if len(points) <= 1:
            return [list(p) for p in points]

        def cross(o, a, b):
            return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])

        # Strict convex hull vertices (cross <= 0 pops collinear interior points).
        lower = []
        for p in points:
            while len(lower) >= 2 and cross(lower[-2], lower[-1], p) <= 0:
                lower.pop()
            lower.append(p)
        upper = []
        for p in reversed(points):
            while len(upper) >= 2 and cross(upper[-2], upper[-1], p) <= 0:
                upper.pop()
            upper.append(p)
        hull = lower[:-1] + upper[:-1]  # vertices in CCW order

        result = list(hull)
        n = len(hull)
        if n < 2:
            return [list(p) for p in points]

        in_result = set(hull)
        m = len(points)
        # Add collinear points lying on hull edges (boundary points not at vertices).
        for i in range(n):
            a = hull[i]
            b = hull[(i + 1) % n]
            for idx in range(m):
                p = points[idx]
                if p in in_result or p == a or p == b:
                    continue
                if cross(a, b, p) == 0:
                    if min(a[0], b[0]) <= p[0] <= max(a[0], b[0]) and min(a[1], b[1]) <= p[1] <= max(a[1], b[1]):
                        result.append(p)
                        in_result.add(p)
        return [list(p) for p in result]
