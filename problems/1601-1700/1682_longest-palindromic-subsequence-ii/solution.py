from typing import List, Optional


class Solution:
    def longestPalindromeSubseq(self, s: str) -> int:
        # Interval DP keyed by the outermost pair's letter: dp[l][r][c] is
        # the longest good palindromic subsequence inside s[l..r] whose
        # first and last characters are both c; nesting a pair around an
        # inner one requires the two letters to differ.
        n = len(s)
        dp = [[[0] * 26 for _ in range(n)] for _ in range(n)]
        for l in range(n - 2, -1, -1):
            for r in range(l + 1, n):
                row = [a if a > b else b for a, b in zip(dp[l][r - 1], dp[l + 1][r])]
                if s[l] == s[r]:
                    c0 = ord(s[l]) - 97
                    inner = dp[l + 1][r - 1]
                    # Best inner length avoiding the outer letter: the row
                    # maximum when it peaks elsewhere, the best of the other
                    # 25 letters when the row peaks exactly at c0.
                    best = max(inner)
                    if inner[c0] == best:
                        saved = inner[c0]
                        inner[c0] = -1
                        best = max(inner)
                        inner[c0] = saved
                    if 2 + best > row[c0]:
                        row[c0] = 2 + best
                dp[l][r] = row
        return max(dp[0][n - 1])
