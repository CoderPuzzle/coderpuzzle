from math import isqrt
from typing import List, Optional


class Solution:
    def minNumberOfSeconds(self, mountainHeight: int, workerTimes: List[int]) -> int:
        def units(wt, t):
            # largest x such that wt * x*(x+1)/2 <= t  =>  x*(x+1) <= 2*t//wt
            c = (2 * t) // wt
            return (isqrt(1 + 4 * c) - 1) // 2

        hi = max(workerTimes) * mountainHeight * (mountainHeight + 1) // 2
        lo = 0
        while lo < hi:
            mid = (lo + hi) // 2
            total = 0
            for wt in workerTimes:
                total += units(wt, mid)
                if total >= mountainHeight:
                    break
            if total >= mountainHeight:
                hi = mid
            else:
                lo = mid + 1
        return lo
