from typing import List, Optional


class Solution:
    def maximumCandies(self, candies: List[int], k: int) -> int:
        # feasibility is monotone in c: if every child can get c, any smaller
        # amount works too, so binary search the largest feasible c
        def can(c):
            # c == 0 is vacuously feasible: pins the search's lower end at 0
            if c == 0:
                return True
            cnt = 0
            for p in candies:
                # a pile of size p splits into exactly p // c child portions
                cnt += p // c
                if cnt >= k:
                    # early exit the moment k portions are secured
                    return True
            return cnt >= k

        lo, hi = 0, max(candies)
        while lo < hi:
            # upper mid: when feasible, lo moves up to mid; the +1 keeps the
            # search progressing instead of looping forever at lo == hi - 1
            mid = (lo + hi + 1) // 2
            if can(mid):
                lo = mid
            else:
                hi = mid - 1
        return lo
