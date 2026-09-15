from typing import List, Optional


class Solution:
    def buildArray(self, nums: List[int]) -> List[int]:
        # One pass of nested indexing: nums is a permutation of 0..n-1, so
        # every value is itself a valid index and nums[nums[i]] is in range.
        return [nums[x] for x in nums]
