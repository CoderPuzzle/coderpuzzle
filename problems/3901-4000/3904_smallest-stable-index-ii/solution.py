from typing import List


class Solution:
    def firstStableIndex(self, nums: List[int], k: int) -> int:
        suffix_min = nums.copy()
        for i in range(len(nums) - 2, -1, -1):
            suffix_min[i] = min(nums[i], suffix_min[i + 1])

        prefix_max = nums[0]
        for i, value in enumerate(nums):
            prefix_max = max(prefix_max, value)
            if prefix_max - suffix_min[i] <= k:
                return i
        return -1
