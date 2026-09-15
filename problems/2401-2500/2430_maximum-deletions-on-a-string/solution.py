from typing import List, Optional


class Solution:
    def deleteString(self, s: str) -> int:
        # dp[i] = max operations to delete s[i:]; LCP via two rolling rows
        n = len(s)
        dp = [1] * n + [0]  # dp[n] = 0 (empty suffix needs no operations)
        next_row = [0] * (n + 1)  # lcp row for index i+1
        for i in range(n - 1, -1, -1):
            si = s[i]
            cur = [0] * (n + 1)
            for j in range(n - 1, -1, -1):
                if si == s[j]:
                    cur[j] = next_row[j + 1] + 1
            best = 1
            max_len = (n - i) // 2
            for length in range(1, max_len + 1):
                if cur[i + length] >= length:
                    cand = 1 + dp[i + length]
                    if cand > best:
                        best = cand
            dp[i] = best
            next_row = cur
        return dp[0]
