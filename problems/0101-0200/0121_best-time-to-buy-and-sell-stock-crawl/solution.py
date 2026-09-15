from typing import List


class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        # Every sale is fixed by two days: the day it sells and the cheapest
        # day before it, so one pass folding two values answers everything.
        cheapest = prices[0]
        best = 0
        for price in prices:
            # The cheapest prefix so far; on the day it drops to price itself,
            # price - cheapest is 0, so a day can never sell to itself.
            cheapest = min(cheapest, price)
            best = max(best, price - cheapest)
        # best starts at 0, so prices that only fall return the no-profit 0.
        return best
