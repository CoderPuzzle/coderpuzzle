from typing import List, Optional


class Solution:
    def minInsertions(self, s: str) -> int:
        n = len(s)
        # dp[i][j] = min insertions to make s[i..j] a palindrome.
        dp = [[0] * n for _ in range(n)]
        for length in range(2, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1
                if s[i] == s[j]:
                    dp[i][j] = dp[i + 1][j - 1] if length > 2 else 0
                else:
                    dp[i][j] = 1 + min(dp[i + 1][j], dp[i][j - 1])
        return dp[0][n - 1]
