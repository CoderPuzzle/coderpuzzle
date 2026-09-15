class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
        # No interleaving can add or drop letters, so settle the length first.
        m, n = len(s1), len(s2)
        if m + n != len(s3):
            return False
        # dp[i][j]: the first i letters of s1 and the first j letters of s2
        # can interleave into the first i + j letters of s3.
        dp = [[False] * (n + 1) for _ in range(m + 1)]
        dp[0][0] = True
        for i in range(1, m + 1):
            dp[i][0] = dp[i - 1][0] and s1[i - 1] == s3[i - 1]
        for j in range(1, n + 1):
            dp[0][j] = dp[0][j - 1] and s2[j - 1] == s3[j - 1]
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                # The prefix's last letter came from one of the two strings:
                # keep whichever source still has a living reach.
                dp[i][j] = (dp[i - 1][j] and s1[i - 1] == s3[i + j - 1]) or (
                    dp[i][j - 1] and s2[j - 1] == s3[i + j - 1]
                )
        return dp[m][n]
