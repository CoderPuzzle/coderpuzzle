from typing import List


class Solution:
    def findNonMinOrMax(self, nums: List[int]) -> int:
        if len(nums) < 3:
            return -1
        a, b, c = nums[0], nums[1], nums[2]
        return a + b + c - min(a, b, c) - max(a, b, c)
