from typing import List, Optional


class Solution:
    def minDeletionSize(self, strs: List[str]) -> int:
        rows, cols = len(strs), len(strs[0])
        # dp[j] = the most columns a valid surviving chain can hold when it
        # ends at column j; a later column extends it only when no row
        # descends between the two columns.
        dp = [1] * cols
        best = 1
        for j in range(cols):
            for i in range(j):
                if all(strs[r][i] <= strs[r][j] for r in range(rows)):
                    dp[j] = max(dp[j], dp[i] + 1)
            best = max(best, dp[j])
        return cols - best
