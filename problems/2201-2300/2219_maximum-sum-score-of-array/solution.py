from typing import List


class Solution:
    def maximumSumScore(self, nums: List[int]) -> int:
        # The suffix sum at i is total minus the prefix sum before it, so
        # one running total plus the array total covers every index in a
        # single pass.
        total = sum(nums)
        prefix = 0
        best = -(10**30)
        for value in nums:
            prefix += value
            best = max(best, prefix, total - prefix + value)
        return best
