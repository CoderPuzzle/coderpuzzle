from typing import List


class Solution:
    def findValidElements(self, nums: List[int]) -> List[int]:
        left_max = nums.copy()
        for i in range(1, len(nums)):
            left_max[i] = max(left_max[i - 1], nums[i])

        right_max = nums.copy()
        for i in range(len(nums) - 2, -1, -1):
            right_max[i] = max(right_max[i + 1], nums[i])

        return [
            value
            for i, value in enumerate(nums)
            if i == 0 or i == len(nums) - 1 or value > left_max[i - 1] or value > right_max[i + 1]
        ]
