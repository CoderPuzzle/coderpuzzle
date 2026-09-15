from typing import List, Optional


class Solution:
    def longestPalindromicSubsequence(self, s: str, k: int) -> int:
        def _dist(a, b):
            d = abs(ord(a) - ord(b))
            return min(d, 26 - d)

        n = len(s)
        # dp[i][j][c] = longest palindromic subsequence of s[i..j] using at most c
        # operations.
        dp = [[[0] * (k + 1) for _ in range(n)] for _ in range(n)]
        for i in range(n):
            for c in range(k + 1):
                dp[i][i][c] = 1
        for length in range(2, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1
                for c in range(k + 1):
                    best = dp[i + 1][j][c]
                    if dp[i][j - 1][c] > best:
                        best = dp[i][j - 1][c]
                    d = _dist(s[i], s[j])
                    if d <= c:
                        val = dp[i + 1][j - 1][c - d] + 2
                        if val > best:
                            best = val
                    dp[i][j][c] = best
        return dp[0][n - 1][k]
