from typing import List, Optional
import math


class Solution:
    def minEatingSpeed(self, piles: List[int], h: int) -> int:
        # Pile p costs ceil(p / k) hours; hours(k) only shrinks as k
        # grows, so feasibility is a threshold.
        def hours_needed(k: int) -> int:
            return sum(math.ceil(pile / k) for pile in piles)

        # Range [1, max(piles)]: the max speed empties any pile in a
        # single hour, and h >= len(piles) makes it always feasible.
        lo, hi = 1, max(piles)
        while lo < hi:
            mid = (lo + hi) // 2
            # Lower-bound bisection: feasible means the answer is mid
            # or smaller; infeasible raises lo. Exiting, lo is the
            # smallest feasible speed.
            if hours_needed(mid) <= h:
                hi = mid
            else:
                lo = mid + 1
        return lo
