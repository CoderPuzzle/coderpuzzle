from typing import List


class Solution:
    def minOperations(self, nums: List[int]) -> int:
        total = 0
        for previous, current in zip(nums, nums[1:]):
            if previous > current:
                total += previous - current
        return total
