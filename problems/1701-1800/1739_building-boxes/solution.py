from typing import List, Optional


class Solution:
    def minimumBoxes(self, n: int) -> int:
        # Densest packing lives in a corner. A complete k-step staircase
        # floor of T(k) = k(k+1)/2 cells carries the pyramid of
        # S(k) = k(k+1)(k+2)/6 boxes, and j extra cells laid along the
        # next diagonal add T(j) = j(j+1)/2 more. Binary-search the
        # largest pyramid strictly below n, then the fewest runoff cells
        # covering the rest; the answer is T(k) + j.
        lo, hi = 0, 2500  # S(2500) > 2^31 - 1, so hi stands above every n
        while hi - lo > 1:
            mid = (lo + hi) // 2
            if mid * (mid + 1) * (mid + 2) // 6 < n:
                lo = mid
            else:
                hi = mid
        k = lo  # largest k with S(k) < n
        rest = n - k * (k + 1) * (k + 2) // 6
        lo, hi = 1, k + 1  # T(k+1) >= rest always holds
        while lo < hi:
            mid = (lo + hi) // 2
            if mid * (mid + 1) // 2 >= rest:
                hi = mid
            else:
                lo = mid + 1
        return k * (k + 1) // 2 + lo
