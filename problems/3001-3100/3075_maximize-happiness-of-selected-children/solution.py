from typing import List


class Solution:
    def maximumHappinessSum(self, happiness: List[int], k: int) -> int:
        # Every unselected child loses 1 per turn, so the child picked in
        # turn i (0-based) contributes its original value minus i, floored
        # at 0. Values only shrink while waiting, so taking the largest
        # available each turn is optimal.
        happiness.sort(reverse=True)
        return sum(max(value - turn, 0) for turn, value in enumerate(happiness[:k]))
