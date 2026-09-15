from bisect import bisect_left
from typing import List


class Solution:
    def maximumCount(self, nums: List[int]) -> int:
        # In a sorted array the negatives are exactly the prefix ending
        # before the first value >= 0 and the positives are exactly the
        # suffix starting at the first value >= 1. Two binary searches fix
        # both boundaries in O(log n); zeros belong to neither side.
        first_nonneg = bisect_left(nums, 0)
        first_pos = bisect_left(nums, 1)
        return max(first_nonneg, len(nums) - first_pos)
