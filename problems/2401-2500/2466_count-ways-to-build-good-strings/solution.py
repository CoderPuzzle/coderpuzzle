from typing import List, Optional


class Solution:
    def countGoodStrings(self, low: int, high: int, zero: int, one: int) -> int:
        MOD = 10**9 + 7
        # dp[L] = buildable strings of length L; dp[0] = 1 for the empty
        # string. A string's final block (zeros or ones) fixes its last
        # character, so the two cases are disjoint and exhaustive.
        dp = [0] * (high + 1)
        dp[0] = 1
        for length in range(1, high + 1):
            # Climb-stairs recurrence with step sizes zero and one; the
            # appended letter at each step fixes content, so distinct block
            # sequences are distinct strings.
            ways = 0
            if length >= zero:
                ways += dp[length - zero]
            if length >= one:
                ways += dp[length - one]
            dp[length] = ways % MOD
        # Length is the only acceptance criterion, so sum lengths in range.
        return sum(dp[low : high + 1]) % MOD
