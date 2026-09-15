from typing import List, Optional
from fractions import Fraction
from math import ceil


class Solution:
    def minSpeedOnTime(self, dist: List[int], hour: float) -> int:
        n = len(dist)
        # Fraction(str(hour)) reads the decimal representation, so every
        # deadline comparison below is an exact rational, not a binary float.
        budget = Fraction(str(hour))

        def on_time(speed):
            # Every leg but the last must end on an integer hour (the next
            # train departs then), costing ceil(d/s); the final leg has no
            # successor and costs exactly d/s.
            total = sum(ceil(Fraction(d, speed)) for d in dist[:-1])
            total += Fraction(dist[-1], speed)
            return total <= budget

        # On-time is monotone in speed — if s works, every faster speed
        # works — so search for the smallest feasible s; 10^7 is the
        # guaranteed ceiling, and -1 if even it fails.
        lo, hi = 1, 10**7
        if not on_time(hi):
            return -1
        while lo < hi:
            mid = (lo + hi) // 2
            if on_time(mid):
                hi = mid
            else:
                lo = mid + 1
        return lo
