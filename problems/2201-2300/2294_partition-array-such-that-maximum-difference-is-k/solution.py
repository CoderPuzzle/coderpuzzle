from typing import List


class Solution:
    def partitionArray(self, nums: List[int], k: int) -> int:
        nums.sort()
        groups = 1
        start = nums[0]
        for value in nums:
            if value - start > k:
                groups += 1
                start = value
        return groups
