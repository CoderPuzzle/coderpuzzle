from typing import List, Optional


class Solution:
    def minDays(self, bloomDay: List[int], m: int, k: int) -> int:
        n = len(bloomDay)
        # Not enough flowers to ever build m bouquets of k flowers each.
        if m * k > n:
            return -1

        def feasible(day):
            bouquets = 0
            run = 0
            for d in bloomDay:
                if d <= day:
                    # Extend the run of consecutive bloomed flowers.
                    run += 1
                    if run == k:
                        # A full run completes one bouquet; reset the run.
                        bouquets += 1
                        run = 0
                else:
                    # Bouquets cannot span an unbloomed flower.
                    run = 0
            return bouquets >= m

        # Feasibility is monotone in the day (blooming only adds flowers),
        # so binary search the first feasible day between the extreme
        # bloom days: no flower opens before the first, all are open by the last.
        lo, hi = min(bloomDay), max(bloomDay)
        while lo < hi:
            mid = (lo + hi) // 2
            if feasible(mid):
                hi = mid
            else:
                lo = mid + 1
        return lo
