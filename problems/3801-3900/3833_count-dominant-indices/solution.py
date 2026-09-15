from typing import List, Optional


class Solution:
    def dominantIndices(self, nums: List[int]) -> int:
        # Walk backward from the second-to-last index, carrying the sum of
        # the strict suffix after i. The comparison nums[i] > sum/(n-1-i)
        # is exactly nums[i] * (n-1-i) > sum in integer arithmetic, so no
        # fractional average is ever formed — and an element equal to its
        # suffix average is not dominant, since the inequality is strict.
        n = len(nums)
        count = 0
        suffix = 0
        for i in range(n - 2, -1, -1):
            suffix += nums[i + 1]
            if nums[i] * (n - 1 - i) > suffix:
                count += 1
        return count
