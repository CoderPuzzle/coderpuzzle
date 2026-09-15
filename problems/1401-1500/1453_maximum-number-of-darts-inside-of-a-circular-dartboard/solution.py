from typing import List


class Solution:
    def numPoints(self, darts: List[List[int]], r: int) -> int:
        n = len(darts)
        best = 1
        r2 = r * r
        eps = 1e-7

        def count_at(cx: float, cy: float) -> int:
            return sum(1 for x, y in darts if (x - cx) ** 2 + (y - cy) ** 2 <= r2 + eps)

        for i in range(n):
            best = max(best, count_at(darts[i][0], darts[i][1]))
        for i in range(n):
            x1, y1 = darts[i]
            for j in range(i + 1, n):
                x2, y2 = darts[j]
                dx, dy = x2 - x1, y2 - y1
                d2 = dx * dx + dy * dy
                if d2 == 0 or d2 > 4 * r2:
                    continue
                h2 = r2 - d2 / 4.0
                if h2 < 0:
                    h2 = 0.0
                scale = (h2 / d2) ** 0.5
                mx, my = (x1 + x2) / 2.0, (y1 + y2) / 2.0
                for sign in (1.0, -1.0):
                    best = max(best, count_at(mx + sign * scale * -dy, my + sign * scale * dx))
        return best
