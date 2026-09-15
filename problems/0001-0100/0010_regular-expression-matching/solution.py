from typing import List, Optional


class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        m, n = len(s), len(p)
        # dp[i][j]: do the first i chars of s match the first j chars of p?
        dp = [[False] * (n + 1) for _ in range(m + 1)]
        # The empty string matches the empty pattern.
        dp[0][0] = True
        # First row: only trailing x* units can vanish, so dropping the
        # star's two-character unit must still match nothing.
        for j in range(1, n + 1):
            if p[j - 1] == "*":
                dp[0][j] = dp[0][j - 2]
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if p[j - 1] == "*":
                    # Two cases cover every repetition count: zero
                    # occurrences (erase the x* unit), or one more
                    # occurrence of p[j-2] consuming s[i-1].
                    dp[i][j] = dp[i][j - 2] or (dp[i - 1][j] and (p[j - 2] == "." or p[j - 2] == s[i - 1]))
                else:
                    # A literal or '.' must consume one character of s that
                    # it equals ('.' agrees with anything).
                    dp[i][j] = dp[i - 1][j - 1] and (p[j - 1] == "." or p[j - 1] == s[i - 1])
        # Prefix table: true only when the pattern matches all of s.
        return dp[m][n]
