from typing import List, Optional


class Solution:
    def longestSubarray(self, nums: List[int]) -> int:
        best = 0
        left = 0
        zeros = 0
        for right, value in enumerate(nums):
            if value == 0:
                zeros += 1
            while zeros > 1:
                if nums[left] == 0:
                    zeros -= 1
                left += 1
            best = max(best, right - left + 1)
        # window includes the zero; deleting it costs one slot, but we must
        # delete exactly one element either way
        if zeros == 0:
            return len(nums) - 1  # all ones, must still delete one element
        return best - 1
