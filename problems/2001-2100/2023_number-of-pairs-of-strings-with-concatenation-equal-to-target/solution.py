from typing import List


class Solution:
    def numOfPairs(self, nums: List[str], target: str) -> int:
        pairs = 0
        for first in range(len(nums)):
            for second in range(len(nums)):
                if first != second and nums[first] + nums[second] == target:
                    pairs += 1
        return pairs
