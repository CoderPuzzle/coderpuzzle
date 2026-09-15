from typing import List


class Solution:
    def maximumCount(self, nums: List[int]) -> int:
        # The statement defines the answer outright: neg counts the entries
        # below zero, pos counts the entries above zero, and zeros join
        # neither camp. One walk over nums tallies both counts.
        neg = 0
        pos = 0
        for value in nums:
            if value < 0:
                neg += 1
            elif value > 0:
                pos += 1
        return max(neg, pos)
