from typing import List, Optional
from math import gcd


class Solution:
    def subsequencePairCount(self, nums: List[int]) -> int:
        MOD = 10**9 + 7
        # dp[g1][g2] = ways to split the processed prefix into a sequence with
        # gcd g1 and a sequence with gcd g2 (gcd 0 denotes an empty sequence).
        max_val = 200
        dp = [[0] * (max_val + 1) for _ in range(max_val + 1)]
        dp[0][0] = 1
        for x in nums:
            ndp = [row[:] for row in dp]
            for g1 in range(max_val + 1):
                row = dp[g1]
                for g2 in range(max_val + 1):
                    cur = row[g2]
                    if not cur:
                        continue
                    ng1 = gcd(g1, x)
                    ndp[ng1][g2] = (ndp[ng1][g2] + cur) % MOD
                    ng2 = gcd(g2, x)
                    ndp[g1][ng2] = (ndp[g1][ng2] + cur) % MOD
            dp = ndp

        total = 0
        for g in range(1, max_val + 1):
            total = (total + dp[g][g]) % MOD
        return total
