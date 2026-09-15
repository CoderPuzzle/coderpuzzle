from typing import List, Optional


class Solution:
    def maxScore(self, grid: List[List[int]]) -> int:
        n = len(grid)
        # value -> bitmask of rows containing that value
        value_rows = {}
        for r in range(n):
            for c in grid[r]:
                value_rows[c] = value_rows.get(c, 0) | (1 << r)

        full = 1 << n
        dp = [-1] * full
        dp[0] = 0
        ndp = [-1] * full
        for value in sorted(value_rows, reverse=True):
            rows = value_rows[value]
            ndp[:] = dp
            for mask in range(full):
                cur = dp[mask]
                if cur < 0:
                    continue
                rem = rows & ~mask
                while rem:
                    bit = rem & -rem
                    nmask = mask | bit
                    cand = cur + value
                    if cand > ndp[nmask]:
                        ndp[nmask] = cand
                    rem &= rem - 1
            dp, ndp = ndp, dp
        return max(dp)
