from typing import List
from functools import lru_cache


class Solution:
    def minDistance(self, houses: List[int], k: int) -> int:
        houses = sorted(houses)
        n = len(houses)

        def run_cost(i: int, j: int) -> int:
            # one mailbox at the median of houses[i..j]
            total = 0
            lo, hi = i, j
            while lo < hi:
                total += houses[hi] - houses[lo]
                lo += 1
                hi -= 1
            return total

        @lru_cache(maxsize=None)
        def dp(i: int, boxes: int) -> int:
            remaining = n - i
            if boxes >= remaining:
                return 0  # a mailbox per house: zero distance
            if boxes == 1:
                return run_cost(i, n - 1)
            best = float("inf")
            for j in range(i, n - (boxes - 1)):
                cost = run_cost(i, j) + dp(j + 1, boxes - 1)
                if cost < best:
                    best = cost
            return best

        return dp(0, k)
