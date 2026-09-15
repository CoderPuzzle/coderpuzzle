from typing import List, Optional


class Solution:
    def minimumPrefixLength(self, nums: List[int]) -> int:
        # What survives removal is a suffix, and a suffix is strictly
        # increasing exactly when none of its adjacent pairs violates the
        # order, so the best cut sits just past the LAST violating pair.
        # Scan from the right and stop at the first index i with
        # nums[i] >= nums[i + 1]; that i is the rightmost violation.
        n = len(nums)
        for i in range(n - 2, -1, -1):
            if nums[i] >= nums[i + 1]:
                return i + 1
        return 0
