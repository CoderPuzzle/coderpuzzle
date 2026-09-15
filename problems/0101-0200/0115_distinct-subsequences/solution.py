from typing import List, Optional


class Solution:
    def numDistinct(self, s: str, t: str) -> int:
        m = len(t)
        # dp[j] = ways to form the first j chars of t using the prefix of s
        # processed so far. dp[0] = 1 encodes the empty string being formable
        # exactly once, by matching nothing.
        dp = [0] * (m + 1)
        dp[0] = 1
        for ch in s:
            # Sweep j downward so dp[j-1] is still the previous row's value
            # when read; a left-to-right sweep would let one character of s
            # be matched against several characters of t.
            for j in range(m, 0, -1):
                # Reading ch can only create new ways where it matches: every
                # earlier way of forming t[:j-1] extends by matching ch there.
                # Elsewhere ch is simply skipped and the count is unchanged.
                if t[j - 1] == ch:
                    dp[j] += dp[j - 1]
        return dp[m]
