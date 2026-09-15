from typing import List


class Solution:
    def maxProfit(self, k: int, prices: List[int]) -> int:
        n = len(prices)
        if n < 2 or k == 0:
            return 0
        if k >= n // 2:
            # The limit can never bind: sum every upward move.
            return sum(max(prices[i + 1] - prices[i], 0) for i in range(n - 1))
        # buy[j]: best cash while holding the j-th buy; sell[j]: best profit
        # after j completed sells. -inf marks impossible holdings.
        buy = [float("-inf")] * (k + 1)
        sell = [0] * (k + 1)
        for price in prices:
            for j in range(1, k + 1):
                # Keep holding, or buy now out of j-1 finished transactions.
                buy[j] = max(buy[j], sell[j - 1] - price)
                # Stay sold, or sell the held position at today's price.
                # Updating buy first permits a same-day buy-then-sell, which
                # is a zero-profit transaction and never harms optimality.
                sell[j] = max(sell[j], buy[j] + price)
        # sell[k] is the best profit with at most k transactions.
        return sell[k]
