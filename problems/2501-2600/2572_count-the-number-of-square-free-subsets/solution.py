from typing import List, Optional
from collections import Counter

MOD = 10**9 + 7

PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]


def _mask_of(value):
    mask = 0
    for i, p in enumerate(PRIMES):
        if value % p == 0:
            if value % (p * p) == 0:
                return None
            mask |= 1 << i
    return mask


class Solution:
    def squareFreeSubsets(self, nums: List[int]) -> int:
        counts = Counter(nums)
        # dp[mask] = ways to pick a square-free set of numbers (at most one copy
        # of each value, values > 1) whose combined prime factors are `mask`.
        dp = [0] * (1 << 10)
        dp[0] = 1
        for value, cnt in counts.items():
            if value == 1:
                continue
            mask = _mask_of(value)
            if mask is None:
                continue  # contains a squared prime factor; never usable
            ndp = dp[:]
            for m in range(1 << 10):
                if dp[m] and (m & mask) == 0:
                    ndp[m | mask] = (ndp[m | mask] + dp[m] * cnt) % MOD
            dp = ndp

        ways = sum(dp) % MOD
        ones = counts.get(1, 0)
        if ones:
            ways = (ways * pow(2, ones, MOD)) % MOD
        ways = (ways - 1) % MOD  # drop the empty subset
        return ways
