from typing import List


class Solution:
    def minFallingPathSum(self, matrix: List[List[int]]) -> int:
        # Sweep the rows top to bottom carrying one row of answers: dp[j]
        # is the smallest sum of a falling path ending at the current
        # row's column j, built from the three reachable parents above.
        n = len(matrix[0])
        dp = matrix[0][:]
        for row in matrix[1:]:
            prev = dp
            dp = [0] * n
            for j in range(n):
                best = prev[j]
                if j > 0 and prev[j - 1] < best:
                    best = prev[j - 1]
                if j + 1 < n and prev[j + 1] < best:
                    best = prev[j + 1]
                dp[j] = row[j] + best
        return min(dp)
