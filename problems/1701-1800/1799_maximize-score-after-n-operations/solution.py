from math import gcd
from typing import List


class Solution:
    def maxScore(self, nums: List[int]) -> int:
        # dp[mask] is the best score once exactly the elements of mask have
        # been removed; the next operation is popcount(mask) // 2 + 1 and
        # pairs any two still-present elements. Ascending mask order works
        # because transitions only set bits, and the growing multiplier is
        # why the richest pair often belongs to the last operation, not the
        # first. Totals stay below 28 * 10^6, inside 32-bit range.
        m = len(nums)
        g = [[0] * m for _ in range(m)]
        for i in range(m):
            for j in range(i + 1, m):
                g[i][j] = g[j][i] = gcd(nums[i], nums[j])
        size = 1 << m
        dp = [0] * size
        for mask in range(size):
            free = [i for i in range(m) if not mask >> i & 1]
            k = (m - len(free)) // 2 + 1
            base = dp[mask]
            for a in range(len(free)):
                i = free[a]
                for b in range(a + 1, len(free)):
                    j = free[b]
                    cand = base + k * g[i][j]
                    nxt = mask | (1 << i) | (1 << j)
                    if cand > dp[nxt]:
                        dp[nxt] = cand
        return dp[-1]
