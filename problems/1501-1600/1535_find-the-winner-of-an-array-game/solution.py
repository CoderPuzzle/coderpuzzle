from typing import List


class Solution:
    def getWinner(self, arr: List[int], k: int) -> int:
        # Track the running champion and its win streak in a single left-to-
        # right pass; this reproduces the same sequence of wins the literal
        # move-loser-to-the-back simulation would produce.
        champion = arr[0]
        streak = 0
        for value in arr[1:]:
            if value > champion:
                champion = value
                streak = 1
            else:
                streak += 1
            if streak >= k:
                return champion
        return champion
