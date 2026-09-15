from typing import List, Optional


class Solution:
    def goodBinaryStrings(self, minLength: int, maxLength: int, oneGroup: int, zeroGroup: int) -> int:
        # dp[i] counts good strings of length i: peel off the final run of
        # equal characters — its size is a positive multiple of oneGroup or
        # zeroGroup, and what remains is any shorter good string (or nothing).
        mod = 10**9 + 7
        dp = [0] * (maxLength + 1)
        dp[0] = 1
        for i in range(1, maxLength + 1):
            v = 0
            if i >= oneGroup:
                v += dp[i - oneGroup]
            if i >= zeroGroup:
                v += dp[i - zeroGroup]
            dp[i] = v % mod
        return sum(dp[minLength:]) % mod
