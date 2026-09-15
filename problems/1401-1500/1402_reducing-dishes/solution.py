from typing import List, Optional


class Solution:
    def maxSatisfaction(self, satisfaction: List[int]) -> int:
        # Sort ascending; the chosen set is a suffix of this order. Adding
        # a new value at the front shifts every chosen dish one slot later
        # (gaining running_sum) and contributes value * 1 for its own slot,
        # so the net change is value + running_sum.
        satisfaction.sort()
        total = 0
        running_sum = 0
        for value in reversed(satisfaction):
            if running_sum + value > 0:
                running_sum += value
                total += running_sum
        return total
