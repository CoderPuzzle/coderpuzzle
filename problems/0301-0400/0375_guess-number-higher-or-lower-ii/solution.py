from typing import List, Optional


class Solution:
    def getMoneyAmount(self, n: int) -> int:
        # dp[i][j] = min money that guarantees finding any number in
        # [i, j]; padded to n+2 so the empty-side reads dp[i][i-1] and
        # dp[j+1][j] stay valid (and 0).
        dp = [[0] * (n + 2) for _ in range(n + 2)]
        # Fill by interval length: a range's value depends only on its
        # strictly shorter subranges. Length 1 is free (single candidate).
        for length in range(2, n + 1):
            for i in range(1, n - length + 2):
                j = i + length - 1
                best = float("inf")
                # Minimax: the opponent may hide in the worse side, so
                # guessing g costs g + max(dp of the two remaining sides).
                for guess in range(i, j + 1):
                    cost = guess + max(dp[i][guess - 1], dp[guess + 1][j])
                    if cost < best:
                        best = cost
                dp[i][j] = best
        return dp[1][n]
