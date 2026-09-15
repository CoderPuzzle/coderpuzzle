from typing import List, Optional


class Solution:
    def getMaximumConsecutive(self, coins: List[int]) -> int:
        # Invariant: every value in [0, reachable] is makeable as a subset sum.
        reachable = 0
        # Ascending order, so each check applies to the cheapest remaining coin.
        for coin in sorted(coins):
            if coin > reachable + 1:
                # Gap at reachable + 1: every later coin is larger, so it can never be closed.
                break
            # coin <= reachable + 1 extends the contiguous range to reachable + coin.
            reachable += coin
        # Count of consecutive makeable values 0..reachable.
        return reachable + 1
