from typing import List


class Solution:
    def findMiddleIndex(self, nums: List[int]) -> int:
        # Single pass with a running left sum: an index is a middle index when
        # left == total - left - nums[i] (the right side's sum).
        total = sum(nums)
        left = 0
        for i, x in enumerate(nums):
            if left == total - left - x:
                return i
            left += x
        return -1
