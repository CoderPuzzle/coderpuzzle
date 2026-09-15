from typing import List


class Solution:
    def targetIndices(self, nums: List[int], target: int) -> List[int]:
        smaller = sum(value < target for value in nums)
        equal = sum(value == target for value in nums)
        return list(range(smaller, smaller + equal))
