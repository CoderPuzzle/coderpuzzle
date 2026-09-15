from typing import List, Optional


class Solution:
    def transformArray(self, nums: List[int]) -> List[int]:
        # After the parity replacement every entry is 0 or 1, so the sorted
        # result is just zeros for the evens followed by ones for the odds.
        ones = sum(x & 1 for x in nums)
        return [0] * (len(nums) - ones) + [1] * ones
