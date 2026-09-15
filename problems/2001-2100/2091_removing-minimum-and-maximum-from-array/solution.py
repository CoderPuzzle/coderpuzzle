from typing import List


class Solution:
    def minimumDeletions(self, nums: List[int]) -> int:
        minimum_index = 0
        maximum_index = 0
        for index in range(1, len(nums)):
            if nums[index] < nums[minimum_index]:
                minimum_index = index
            if nums[index] > nums[maximum_index]:
                maximum_index = index

        left, right = sorted((minimum_index, maximum_index))
        length = len(nums)
        return min(right + 1, length - left, left + 1 + length - right)
