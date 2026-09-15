from typing import List


class Solution:
    def isMiddleElementUnique(self, nums: List[int]) -> bool:
        middle = nums[len(nums) // 2]
        return nums.count(middle) == 1
