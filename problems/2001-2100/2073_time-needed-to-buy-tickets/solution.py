from typing import List


class Solution:
    def timeRequiredToBuy(self, tickets: List[int], k: int) -> int:
        target = tickets[k]
        elapsed = 0
        for index, count in enumerate(tickets):
            if index <= k:
                elapsed += min(count, target)
            else:
                elapsed += min(count, target - 1)
        return elapsed
