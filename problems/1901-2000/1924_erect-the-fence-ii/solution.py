import math
from typing import List


class Solution:
    def outerTrees(self, trees: List[List[int]]) -> List[float]:
        # Translate by the first tree before converting to floats: small
        # intermediate magnitudes protect the 1e-5 judge tolerance.
        ox, oy = trees[0]
        n = len(trees)
        xs = [float(p[0] - ox) for p in trees]
        ys = [float(p[1] - oy) for p in trees]
        eps = 1e-7

        # Circle with i,j as diameter: midpoint center, squared radius = d^2/4.
        def from2(i: int, j: int):
            cx = (xs[i] + xs[j]) / 2.0
            cy = (ys[i] + ys[j]) / 2.0
            dx = xs[i] - xs[j]
            dy = ys[i] - ys[j]
            return (cx, cy, (dx * dx + dy * dy) / 4.0)

        def from3(i: int, j: int, k: int):
            ax, ay = xs[i], ys[i]
            bx, by = xs[j], ys[j]
            cx, cy = xs[k], ys[k]
            d = 2.0 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by))
            # Zero determinant = collinear, no circumcircle; the best two-point
            # circle among the pairs is the correct enclosing circle.
            if d == 0.0:
                best = None
                for u, v in ((i, j), (i, k), (j, k)):
                    c = from2(u, v)
                    if best is None or c[2] < best[2]:
                        best = c
                return best
            # Circumcenter via the perpendicular-bisector linear system.
            aa = ax * ax + ay * ay
            bb = bx * bx + by * by
            cc = cx * cx + cy * cy
            ux = (aa * (by - cy) + bb * (cy - ay) + cc * (ay - by)) / d
            uy = (aa * (cx - bx) + bb * (ax - cx) + cc * (bx - ax)) / d
            dx = ax - ux
            dy = ay - uy
            return (ux, uy, dx * dx + dy * dy)

        # Epsilon: points exactly on the border count as enclosed despite
        # floating-point error, so they never trigger needless rebuilds.
        def inside(circle, i: int) -> bool:
            dx = xs[i] - circle[0]
            dy = ys[i] - circle[1]
            return dx * dx + dy * dy <= circle[2] + eps

        # Welzl's argument: a point outside the current circle must lie ON the
        # border of the corrected circle — fix i and rebuild one level deeper
        # (j escaping fixes a second border point, k escaping fixes all three).
        circle = (xs[0], ys[0], 0.0)
        for i in range(1, n):
            if inside(circle, i):
                continue
            circle = (xs[i], ys[i], 0.0)
            for j in range(i):
                if inside(circle, j):
                    continue
                circle = from2(i, j)
                for k in range(j):
                    if inside(circle, k):
                        continue
                    circle = from3(i, j, k)
        # Shift the center back; take the square root exactly once at the end.
        cx, cy, r2 = circle
        return [cx + ox, cy + oy, math.sqrt(r2)]
