from typing import List, Optional


class Solution:
    def minimumTime(self, time: List[int], totalTrips: int) -> int:
        def trips_done(t):
            # Buses run independently: each finishes t // x trips by minute
            # t, so the floor-sum is the exact trip count — no simulation.
            return sum(t // x for x in time)

        # The completed-trip total is non-decreasing in t, so binary search
        # the first feasible minute; the fastest bus alone bounds the answer.
        lo, hi = 1, min(time) * totalTrips
        while lo < hi:
            mid = (lo + hi) // 2
            if trips_done(mid) >= totalTrips:
                hi = mid
            else:
                lo = mid + 1
        return lo
