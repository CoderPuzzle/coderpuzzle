from typing import List


class Solution:
    def minimumDistance(self, points: List[List[int]]) -> int:
        n = len(points)
        # |dx| + |dy| over (x, y) equals max(|du|, |dv|) over the rotated
        # coordinates u = x + y, v = x - y, so each axis contributes its
        # own range and can be tracked through sorted extremes alone.
        u = [x + y for x, y in points]
        v = [x - y for x, y in points]
        order_u = sorted(range(n), key=u.__getitem__)
        order_v = sorted(range(n), key=v.__getitem__)
        best = None
        for removed in range(n):
            lo_u = order_u[1] if order_u[0] == removed else order_u[0]
            hi_u = order_u[-2] if order_u[-1] == removed else order_u[-1]
            lo_v = order_v[1] if order_v[0] == removed else order_v[0]
            hi_v = order_v[-2] if order_v[-1] == removed else order_v[-1]
            candidate = max(u[hi_u] - u[lo_u], v[hi_v] - v[lo_v])
            if best is None or candidate < best:
                best = candidate
        return best
