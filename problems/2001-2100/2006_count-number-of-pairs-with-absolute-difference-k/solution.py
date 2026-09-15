from typing import List


class Solution:
    def countKDifference(self, nums: List[int], k: int) -> int:
        pairs = 0
        for first in range(len(nums)):
            for second in range(first + 1, len(nums)):
                if abs(nums[first] - nums[second]) == k:
                    pairs += 1
        return pairs
