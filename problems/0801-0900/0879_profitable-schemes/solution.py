from typing import List, Optional


class Solution:
    def profitableSchemes(self, n: int, minProfit: int, group: List[int], profit: List[int]) -> int:
        # dp[members][p] = number of subsets using at most `members` members and
        # at least p profit; p is capped at minProfit.
        MOD = 10**9 + 7
        dp = [[0] * (minProfit + 1) for _ in range(n + 1)]
        for members in range(n + 1):
            dp[members][0] = 1
        for g, p in zip(group, profit):
            for members in range(n, g - 1, -1):
                for cap in range(minProfit, -1, -1):
                    dp[members][cap] = (dp[members][cap] + dp[members - g][max(0, cap - p)]) % MOD
        return dp[n][minProfit]
