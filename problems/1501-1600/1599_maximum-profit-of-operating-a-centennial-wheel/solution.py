from typing import List


class Solution:
    def minOperationsMaxProfit(self, customers: List[int], boardingCost: int, runningCost: int) -> int:
        # Simulate one rotation at a time: consume the next arrivals (once
        # customers is exhausted, no more arrive), board up to four of
        # whoever is waiting, and track the running profit. best_profit
        # starts at 0 and only moves on a *strict* improvement, so the
        # first rotation to reach the eventual maximum is the one kept —
        # matching "return the minimum number of rotations" on ties.
        waiting = 0
        boarded = 0
        best_profit = 0
        best_rotation = -1
        rotation = 0
        n = len(customers)
        index = 0
        while index < n or waiting > 0:
            if index < n:
                waiting += customers[index]
                index += 1
            board = min(4, waiting)
            waiting -= board
            boarded += board
            rotation += 1
            profit = boarded * boardingCost - rotation * runningCost
            if profit > best_profit:
                best_profit = profit
                best_rotation = rotation
        return best_rotation if best_profit > 0 else -1
