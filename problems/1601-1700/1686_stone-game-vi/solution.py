from typing import List


class Solution:
    def stoneGameVI(self, aliceValues: List[int], bobValues: List[int]) -> int:
        n = len(aliceValues)
        # Taking a stone gains your value AND denies the opponent theirs, so
        # both players effectively compete for aliceValues[i] + bobValues[i].
        order = sorted(range(n), key=lambda i: aliceValues[i] + bobValues[i], reverse=True)
        diff = 0
        for rank, i in enumerate(order):
            if rank % 2 == 0:
                diff += aliceValues[i]  # Alice picks ranks 0, 2, 4, ...
            else:
                diff -= bobValues[i]  # Bob picks ranks 1, 3, 5, ...
        if diff > 0:
            return 1
        if diff < 0:
            return -1
        return 0
