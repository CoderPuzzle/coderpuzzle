from typing import List, Optional


class Solution:
    def maxScore(self, points: List[int], m: int) -> int:
        n = len(points)

        def feasible(target):
            # an optimal walk for a fixed target never backtracks more than one
            # step: sweep left to right, bouncing across the i/i+1 boundary
            moves = 0
            # visits already banked at i by the bounce around the previous boundary
            prev = 0
            for i in range(n):
                gp = points[i]
                # visits still needed at i after crediting the banked ones
                remain = (target + gp - 1) // gp - prev
                if remain >= 1:
                    # 2*remain-1 moves buy remain visits here, banking remain-1 at i+1
                    prev = remain - 1
                    moves += 2 * remain - 1
                elif i != n - 1:
                    # quota already met: a single forward move, nothing banked
                    prev = 0
                    moves += 1
                if moves > m:
                    return False
            return moves <= m

        # feasibility is monotone in the target: binary search the largest achievable one
        lo, hi = 0, max(points) * m
        while lo < hi:
            mid = (lo + hi + 1) // 2
            if feasible(mid):
                lo = mid
            else:
                hi = mid - 1
        return lo
