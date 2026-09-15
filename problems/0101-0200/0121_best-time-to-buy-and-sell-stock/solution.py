from typing import List, Optional


class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        # best seeds at 0: the profit of never trading. min_price tracks the
        # cheapest buy seen so far, so each day needs only one candidate --
        # sell today against it -- instead of testing every buy/sell pair.
        best = 0
        min_price = prices[0]
        for price in prices:
            if price < min_price:
                min_price = price
            # The elif is safe: a new-minimum price yields a non-positive
            # profit, which can never beat `best` (always non-negative).
            # Since min_price only draws from current-or-earlier days, the
            # buy-before-sell order holds automatically.
            elif price - min_price > best:
                best = price - min_price
        return best
