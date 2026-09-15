from typing import List, Optional


class Solution:
    def minDifficulty(self, jobDifficulty: List[int], d: int) -> int:
        n = len(jobDifficulty)
        if n < d:
            return -1
        INF = float("inf")
        # dp[j][i] = min difficulty to schedule the first i jobs in j days.
        dp = [[INF] * (n + 1) for _ in range(d + 1)]
        dp[0][0] = 0
        for j in range(1, d + 1):
            for i in range(j, n + 1):
                day_max = 0
                best = INF
                for k in range(i, j - 1, -1):
                    day_max = max(day_max, jobDifficulty[k - 1])
                    prev = dp[j - 1][k - 1]
                    if prev != INF and prev + day_max < best:
                        best = prev + day_max
                dp[j][i] = best
        return dp[d][n]
