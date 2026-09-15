from typing import List, Optional


class Solution:
    def numSquares(self, n: int) -> int:
        # dp[i] = fewest perfect squares summing to i: any decomposition ends
        # with some square s <= i, leaving the subproblem dp[i - s], so
        # dp[i] = 1 + min(dp[i - s]) over the squares precomputed here.
        squares = [i * i for i in range(1, int(n**0.5) + 1)]
        # dp[0] = 0 anchors the induction (zero squares sum to zero); the inf
        # sentinels simply lose every comparison until a real value lands.
        dp = [0] + [float("inf")] * n
        # Filling i in increasing order means every dp[i - s] consulted is
        # already final.
        for i in range(1, n + 1):
            for s in squares:
                if s > i:
                    break
                if dp[i - s] + 1 < dp[i]:
                    dp[i] = dp[i - s] + 1
        return dp[n]
