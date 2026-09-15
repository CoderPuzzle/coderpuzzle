from typing import List, Optional


class Solution:
    def longestPalindromeSubseq(self, s: str) -> int:
        n = len(s)
        if n == 0:
            return 0
        # dp[i][j] = longest palindromic subsequence inside s[i..j]. Filling
        # i descending and j ascending finalizes the three dependencies
        # (drop left end, drop right end, drop both) before each write.
        dp = [[0] * n for _ in range(n)]
        for i in range(n - 1, -1, -1):
            dp[i][i] = 1
            for j in range(i + 1, n):
                if s[i] == s[j]:
                    # Matching ends wrap the best inner palindrome; the
                    # zero-filled table yields 0 for an empty inner interval.
                    dp[i][j] = dp[i + 1][j - 1] + 2
                else:
                    # At least one end is absent from an optimal answer.
                    dp[i][j] = max(dp[i + 1][j], dp[i][j - 1])
        return dp[0][n - 1]
