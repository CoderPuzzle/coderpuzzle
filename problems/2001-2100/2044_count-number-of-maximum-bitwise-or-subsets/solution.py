from typing import List


class Solution:
    def countMaxOrSubsets(self, nums: List[int]) -> int:
        maximum = 0
        for value in nums:
            maximum |= value

        def count(index: int, current: int) -> int:
            if index == len(nums):
                return int(current == maximum)
            return count(index + 1, current) + count(index + 1, current | nums[index])

        return count(0, 0)
