from typing import List, Optional


class Solution:
    def minScoreTriangulation(self, values: List[int]) -> int:
        # dp[i][j] = minimum score to triangulate the sub-polygon values[i..j].
        n = len(values)
        dp = [[0] * n for _ in range(n)]
        for gap in range(2, n):
            for i in range(n - gap):
                j = i + gap
                best = None
                for k in range(i + 1, j):
                    candidate = dp[i][k] + dp[k][j] + values[i] * values[k] * values[j]
                    if best is None or candidate < best:
                        best = candidate
                dp[i][j] = best
        return dp[0][n - 1]
