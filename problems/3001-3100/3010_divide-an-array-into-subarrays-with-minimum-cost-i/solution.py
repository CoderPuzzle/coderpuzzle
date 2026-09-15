from typing import List


class Solution:
    def minimumCost(self, nums: List[int]) -> int:
        smallest, second = sorted(nums[1:3])
        for value in nums[3:]:
            if value < smallest:
                second = smallest
                smallest = value
            elif value < second:
                second = value
        return nums[0] + smallest + second
