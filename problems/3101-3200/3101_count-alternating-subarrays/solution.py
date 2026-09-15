from typing import List


class Solution:
    def countAlternatingSubarrays(self, nums: List[int]) -> int:
        count = 0
        current = 0
        for index, value in enumerate(nums):
            if index > 0 and value == nums[index - 1]:
                current = 1
            else:
                current += 1
            count += current
        return count
