from typing import List, Optional


class Solution:
    def minimumAddedCoins(self, coins: List[int], target: int) -> int:
        coins = sorted(coins)
        reach = 0  # every value in [1, reach] is obtainable
        added = 0
        i = 0
        while reach < target:
            if i < len(coins) and coins[i] <= reach + 1:
                reach += coins[i]
                i += 1
            else:
                # must add the coin worth reach + 1
                reach += reach + 1
                added += 1
        return added
