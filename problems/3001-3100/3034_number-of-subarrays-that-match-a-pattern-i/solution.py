from typing import List, Optional


class Solution:
    def countMatchingSubarrays(self, nums: List[int], pattern: List[int]) -> int:
        # Reduce every adjacent pair to its relation: rise, fall, or tie.
        n, m = len(nums), len(pattern)
        signs = [(nums[i + 1] > nums[i]) - (nums[i + 1] < nums[i]) for i in range(n - 1)]
        # A size m+1 subarray matches iff its m relations equal the pattern,
        # so count windows with a direct element-wise comparison.
        return sum(signs[start : start + m] == pattern for start in range(n - m))
