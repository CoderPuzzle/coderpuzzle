from typing import List, Optional


class Solution:
    def numberOfPermutations(self, n: int, requirements: List[List[int]]) -> int:
        MOD = 10**9 + 7
        req = {}
        max_cnt = 0
        for end, cnt in requirements:
            req[end] = cnt
            max_cnt = max(max_cnt, cnt)

        # dp[j] = number of permutations of length i with j inversions.
        # Growing length i -> i+1 adds between 0 and i new inversions.
        dp = [0] * (max_cnt + 1)
        dp[0] = 1
        for i in range(1, n + 1):
            if i > 1:
                prefix = [0] * (max_cnt + 2)
                s = 0
                for j in range(max_cnt + 1):
                    s = (s + dp[j]) % MOD
                    prefix[j + 1] = s
                ndp = [0] * (max_cnt + 1)
                for j in range(max_cnt + 1):
                    lo = max(0, j - (i - 1))
                    ndp[j] = (prefix[j + 1] - prefix[lo]) % MOD
                dp = ndp
            if (i - 1) in req:
                c = req[i - 1]
                for j in range(max_cnt + 1):
                    if j != c:
                        dp[j] = 0
        return dp[req[n - 1]] % MOD
