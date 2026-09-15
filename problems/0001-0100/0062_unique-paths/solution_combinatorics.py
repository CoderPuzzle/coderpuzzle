from typing import List, Optional


class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        # Every path is m-1 downs and n-1 rights in some order, so counting
        # paths is counting arrangements: C(m+n-2, m-1).
        big = m + n - 2
        small = min(m - 1, n - 1)
        # Multiplicative formula: after step j the running value is exactly
        # C(big-small+j, j), so every division is exact and no factorials
        # (which would be astronomically large) are ever formed.
        result = 1
        for j in range(1, small + 1):
            result = result * (big - small + j) // j
        return result
