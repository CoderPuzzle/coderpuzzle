from typing import List


class Solution:
    def firstStableIndex(self, nums: List[int], k: int) -> int:
        for i in range(len(nums)):
            prefix_max = nums[0]
            for j in range(1, i + 1):
                prefix_max = max(prefix_max, nums[j])

            suffix_min = nums[i]
            for j in range(i + 1, len(nums)):
                suffix_min = min(suffix_min, nums[j])

            if prefix_max - suffix_min <= k:
                return i
        return -1
