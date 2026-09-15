from typing import List


class Solution:
    def canSplitArray(self, nums: List[int], m: int) -> bool:
        # Lengths 1 and 2 reach singletons unconditionally. Beyond that, some
        # adjacent pair must sum to at least m: the last cut of any finishing
        # run frees a final two-element piece that was produced good, while
        # any qualifying pair stays glued as lone elements peel off the ends.
        if len(nums) <= 2:
            return True
        return any(nums[i - 1] + nums[i] >= m for i in range(1, len(nums)))
