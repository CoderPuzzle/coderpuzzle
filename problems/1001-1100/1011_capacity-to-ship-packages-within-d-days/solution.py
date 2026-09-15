from typing import List, Optional


class Solution:
    def shipWithinDays(self, weights: List[int], days: int) -> int:
        def feasible(cap):
            need = 1
            current = 0
            # order fixed: greedily filling each day as full as possible
            # minimizes the day count, so this pass decides feasibility
            for w in weights:
                if current + w > cap:
                    need += 1
                    if need > days:
                        return False
                    current = w
                else:
                    current += w
            return True

        # feasibility is monotone in capacity; lo must at least carry the
        # heaviest package, hi = total weight ships everything in one day
        lo, hi = max(weights), sum(weights)
        while lo < hi:
            mid = (lo + hi) // 2
            # hi always stays feasible, lo moves past infeasible midpoints,
            # so the loop ends on the least feasible capacity
            if feasible(mid):
                hi = mid
            else:
                lo = mid + 1
        return lo
