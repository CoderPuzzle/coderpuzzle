from typing import List, Optional


class Solution:
    def minSubsequence(self, nums: List[int]) -> List[int]:
        # The chosen subsequence must sum to more than half the total.
        # Every element is positive, so taking the largest elements first
        # yields the minimum size and, per size, the maximum sum.
        nums.sort(reverse=True)
        total = sum(nums)
        running = 0
        for i, value in enumerate(nums):
            running += value
            if running * 2 > total:
                return nums[: i + 1]
        return nums
