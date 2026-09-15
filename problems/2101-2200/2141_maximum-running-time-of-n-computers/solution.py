from typing import List, Optional


class Solution:
    def maxRunTime(self, n: int, batteries: List[int]) -> int:
        def feasible(t):
            # Over a t-minute horizon a battery powers one computer at a
            # time, so it contributes at most min(b, t) computer-minutes;
            # the capped pool is freely schedulable, and n computers for t
            # minutes need exactly n*t.
            return sum(min(b, t) for b in batteries) >= n * t

        # Feasibility is monotone in t, so binary search the largest t; the
        # total charge over n computers is an absolute ceiling.
        lo, hi = 0, sum(batteries) // n
        while lo < hi:
            # Upper-mid keeps the search converging on the max feasible value.
            mid = (lo + hi + 1) // 2
            if feasible(mid):
                lo = mid
            else:
                hi = mid - 1
        return lo
