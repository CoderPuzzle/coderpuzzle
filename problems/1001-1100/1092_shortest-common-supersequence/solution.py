from typing import List, Optional


class Solution:
    def shortestCommonSupersequence(self, str1: str, str2: str) -> str:
        n, m = len(str1), len(str2)
        # dp[i][j] = length of the LCS of str1[i:] and str2[j:].
        dp = [[0] * (m + 1) for _ in range(n + 1)]
        for i in range(n - 1, -1, -1):
            for j in range(m - 1, -1, -1):
                if str1[i] == str2[j]:
                    dp[i][j] = dp[i + 1][j + 1] + 1
                else:
                    dp[i][j] = max(dp[i + 1][j], dp[i][j + 1])

        parts = []
        i = j = 0
        while i < n and j < m:
            if str1[i] == str2[j]:
                parts.append(str1[i])
                i += 1
                j += 1
            elif dp[i + 1][j] >= dp[i][j + 1]:
                parts.append(str1[i])
                i += 1
            else:
                parts.append(str2[j])
                j += 1
        parts.append(str1[i:])
        parts.append(str2[j:])
        return "".join(parts)
