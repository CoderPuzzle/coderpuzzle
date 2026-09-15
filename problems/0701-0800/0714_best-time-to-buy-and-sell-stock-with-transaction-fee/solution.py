from typing import List


class Solution:
    def maxProfit(self, prices: List[int], fee: int) -> int:
        # cash: best profit holding no share; hold: best profit holding one.
        # The sentinel makes pre-day-1 holding unreachable; cash=0 means do nothing.
        cash, hold = 0, -(10**9)
        for price in prices:
            # Simultaneous assignment reads yesterday's values on both sides:
            # sell charges the fee once, on the sell leg; buy subtracts the price.
            cash, hold = max(cash, hold + price - fee), max(hold, cash - price)
        # Ending with a share in hand is never better than having sold.
        return cash
