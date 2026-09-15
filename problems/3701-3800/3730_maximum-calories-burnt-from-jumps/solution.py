from typing import List, Optional


class Solution:
    def maxCaloriesBurnt(self, heights: List[int]) -> int:
        # Sorted extremes alternate through the routine: the largest
        # remaining height takes each even index (descending), the smallest
        # takes each odd index (ascending), so every edge spans the widest
        # gap available and the first jump claims the tallest block.
        s = sorted(heights)
        n = len(s)
        arr = [0] * n
        lo, hi = 0, n - 1
        for index in range(n):
            if index % 2 == 0:
                arr[index] = s[hi]
                hi -= 1
            else:
                arr[index] = s[lo]
                lo += 1
        # Squared gaps reach ~10^10 and totals approach 10^15; Python ints
        # widen freely, fixed-width languages must accumulate in 64 bits.
        total = arr[0] * arr[0]
        for index in range(1, n):
            gap = arr[index - 1] - arr[index]
            total += gap * gap
        return total
