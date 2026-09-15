from typing import List


class Solution:
    def minimumSwaps(self, nums: List[int]) -> int:
        zeros = nums.count(0)
        prefix_length = len(nums) - zeros
        return sum(value == 0 for value in nums[:prefix_length])
