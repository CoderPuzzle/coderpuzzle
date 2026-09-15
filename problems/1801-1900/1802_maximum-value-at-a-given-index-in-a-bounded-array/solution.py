from typing import List, Optional


class Solution:
    def maxValue(self, n: int, index: int, maxSum: int) -> int:
        # Binary-search the peak m = nums[index]. Any valid array with that
        # peak has nums[i] >= max(m - |i - index|, 1) at every position,
        # and the elementwise-minimal array meeting those bounds is itself
        # valid, so its sum decides feasibility and grows strictly with m.
        # Probing m up to maxSum = 10^9 makes side sums reach ~5*10^17,
        # past 32 bits — fine on Python's unbounded integers.

        def side(m: int, width: int) -> int:
            # Sum of max(m - d, 1) for d = 1..width.
            if width >= m:
                return m * (m - 1) // 2 + (width - (m - 1))
            return width * m - width * (width + 1) // 2

        lo, hi = 1, maxSum
        while lo < hi:
            mid = (lo + hi + 1) // 2
            if mid + side(mid, index) + side(mid, n - 1 - index) <= maxSum:
                lo = mid
            else:
                hi = mid - 1
        return lo
