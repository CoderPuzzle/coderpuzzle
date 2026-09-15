from typing import List


class Solution:
    def maximumProfit(self, present: List[int], future: List[int], budget: int) -> int:
        dp = [0] * (budget + 1)
        for price, sale in zip(present, future):
            gain = sale - price
            if gain <= 0:
                continue
            for money in range(budget, price - 1, -1):
                dp[money] = max(dp[money], dp[money - price] + gain)
        return dp[budget]
