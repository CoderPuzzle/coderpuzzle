from typing import List


class Solution:
    def stoneGameV(self, stoneValue: List[int]) -> int:
        n = len(stoneValue)
        # Prefix sums turn any slice's weight into an O(1) subtraction.
        prefix = [0] * (n + 1)
        for i in range(n):
            prefix[i + 1] = prefix[i] + stoneValue[i]

        # dp[i][j] is the best score obtainable starting from the slice
        # [i, j]; a single stone (i == j) ends the game with no more score,
        # so the table is left at its zero-initialized default there.
        dp = [[0] * n for _ in range(n)]
        for length in range(2, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1
                best = 0
                for k in range(i, j):
                    left_sum = prefix[k + 1] - prefix[i]
                    right_sum = prefix[j + 1] - prefix[k + 1]
                    if left_sum < right_sum:
                        candidate = left_sum + dp[i][k]
                    elif left_sum > right_sum:
                        candidate = right_sum + dp[k + 1][j]
                    else:
                        # A tie lets Alice keep whichever half scores more later.
                        candidate = left_sum + max(dp[i][k], dp[k + 1][j])
                    if candidate > best:
                        best = candidate
                dp[i][j] = best
        return dp[0][n - 1]
