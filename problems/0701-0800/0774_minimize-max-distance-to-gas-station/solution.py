from typing import List, Optional
import math


class Solution:
    def minmaxGasDist(self, stations: List[int], k: int) -> float:
        gaps = [stations[i + 1] - stations[i] for i in range(len(stations) - 1)]
        lo = 0.0
        hi = float(max(gaps))
        # Binary search the smallest feasible maximum distance.
        for _ in range(60):
            mid = (lo + hi) / 2.0
            if mid <= 0.0:
                hi = 0.0
                break
            needed = sum(math.ceil(g / mid) - 1 for g in gaps)
            if needed <= k:
                hi = mid
            else:
                lo = mid
        return hi
