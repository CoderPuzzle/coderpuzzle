from typing import List, Optional
from math import isqrt


class Solution:
    def repairCars(self, ranks: List[int], cars: int) -> int:
        def feasible(t):
            # Within budget t, a rank-r mechanic finishes r*n^2 <= t cars, so
            # its capacity is isqrt(t // r); the check sums capacities and
            # exits early once the demand is covered.
            total = 0
            for r in ranks:
                total += isqrt(t // r)
                if total >= cars:
                    return True
            return total >= cars

        # Feasibility is monotone in t (mechanics can idle), so binary search
        # the minimum feasible time. Upper bound: the best mechanic repairing
        # every car alone, min(ranks) * cars^2.
        lo, hi = 1, min(ranks) * cars * cars
        while lo < hi:
            mid = (lo + hi) // 2
            if feasible(mid):
                hi = mid
            else:
                lo = mid + 1
        return lo
