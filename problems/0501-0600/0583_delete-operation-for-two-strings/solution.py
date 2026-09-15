from typing import List, Optional


class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        a, b = word1, word2
        la, lb = len(a), len(b)
        # dp[i][j] = LCS length of the first i chars of a and first j of b; row/col 0 stay 0.
        dp = [[0] * (lb + 1) for _ in range(la + 1)]
        for i in range(1, la + 1):
            for j in range(1, lb + 1):
                if a[i - 1] == b[j - 1]:
                    # Matching chars extend the diagonal prefix by one.
                    dp[i][j] = dp[i - 1][j - 1] + 1
                else:
                    # Drop the last char of one string and carry the better result forward.
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
        lcs = dp[la][lb]
        # Keep the LCS, delete everything else from both words.
        return la + lb - 2 * lcs
