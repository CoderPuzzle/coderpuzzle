from typing import List, Optional


class Solution:
    def threeConsecutiveOdds(self, arr: List[int]) -> bool:
        # Track a running streak of consecutive odd values; any even value
        # resets it. Three in a row settles the answer immediately.
        streak = 0
        for value in arr:
            if value % 2 != 0:
                streak += 1
                if streak >= 3:
                    return True
            else:
                streak = 0
        return False
