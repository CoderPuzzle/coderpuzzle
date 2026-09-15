from typing import List


class Solution:
    def findMissingElements(self, nums: List[int]) -> List[int]:
        # Mark presence per value, then sweep the original range [min, max]
        # in increasing order: every unmarked value is missing, and sweeping
        # in order yields the sorted result directly.
        lo, hi = min(nums), max(nums)
        present = [False] * (hi + 1)
        for value in nums:
            present[value] = True
        return [value for value in range(lo, hi + 1) if not present[value]]
