from typing import List, Optional


class Solution:
    def numOfArrays(self, n: int, m: int, k: int) -> int:
        MOD = 10**9 + 7
        if k <= 0 or k > n or k > m:
            return 0
        # dp[c][j] = number of arrays of current length with search_cost c
        # and current maximum j.
        dp = [[0] * (m + 1) for _ in range(k + 1)]
        for j in range(1, m + 1):
            dp[1][j] = 1
        for _ in range(2, n + 1):
            ndp = [[0] * (m + 1) for _ in range(k + 1)]
            for c in range(1, k + 1):
                prev = dp[c - 1]
                pref = [0] * (m + 1)
                for j in range(1, m + 1):
                    pref[j] = (pref[j - 1] + prev[j]) % MOD
                cur = dp[c]
                row = ndp[c]
                for j in range(1, m + 1):
                    row[j] = (cur[j] * j + pref[j - 1]) % MOD
            dp = ndp
        return sum(dp[k]) % MOD
