from math import gcd
from typing import List


class Solution:
    def minimumTime(self, d: List[int], r: List[int]) -> int:
        # Least common multiple of the two recharge periods; dividing before
        # multiplying keeps the intermediate small.
        period = r[0] // gcd(r[0], r[1]) * r[1]

        def fits(t: int) -> bool:
            # Hours each drone can work in: all t hours minus its recharge
            # hours (the multiples of its own period).
            c1 = t - t // r[0]
            c2 = t - t // r[1]
            # Hours open to at least one drone: everything except multiples
            # of both periods, which idle the two drones simultaneously.
            return d[0] <= c1 and d[1] <= c2 and d[0] + d[1] <= t - t // period

        # fits grows with t, so halve down to the smallest feasible horizon;
        # twice the combined load always suffices since periods are >= 2.
        lo, hi = 1, 2 * (d[0] + d[1])
        while lo < hi:
            mid = (lo + hi) // 2
            if fits(mid):
                hi = mid
            else:
                lo = mid + 1
        return lo
