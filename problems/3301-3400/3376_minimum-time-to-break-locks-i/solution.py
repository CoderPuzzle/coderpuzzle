import math
from typing import List


class Solution:
    def findMinimumTime(self, strength: List[int], k: int) -> int:
        # Breaking lock i as the j-th lock (0-based) takes ceil(strength[i]
        # / (1 + j*k)) minutes, because the sword banks 1 + j*k energy per
        # minute. Which locks are already broken is all that matters, so a
        # bitmask DP works: best[mask] is the minimum minutes to break
        # exactly the locks in mask, and each unbroken lock i extends mask
        # at the cost of one ceil division by the next slot's factor
        # 1 + popcount(mask)*k. n <= 8 keeps this at a few thousand moves.
        n = len(strength)
        best = [math.inf] * (1 << n)
        best[0] = 0
        for mask in range(1 << n):
            factor = 1 + mask.bit_count() * k
            for i in range(n):
                if not mask >> i & 1:
                    cost = best[mask] + (strength[i] + factor - 1) // factor
                    if cost < best[mask | 1 << i]:
                        best[mask | 1 << i] = cost
        return best[-1]
