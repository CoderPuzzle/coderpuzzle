from typing import List


class Solution:
    def findUnsortedSubarray(self, nums: List[int]) -> int:
        # Sort a copy and compare position by position: everything outside
        # the reorder window already sits where the sorted order puts it,
        # so the FIRST and LAST disagreeing positions are the window's edges.
        sorted_nums = sorted(nums)
        start = 0
        while start < len(nums) and nums[start] == sorted_nums[start]:
            start += 1
        if start == len(nums):
            return 0
        end = len(nums) - 1
        while nums[end] == sorted_nums[end]:
            end -= 1
        return end - start + 1
