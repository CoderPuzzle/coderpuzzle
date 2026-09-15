from typing import List


class Solution:
    def maxSum(self, nums: List[int]) -> int:
        # Deletions are free, so the chosen subarray is really a set of
        # distinct values: keep every positive value once, and when no
        # positive exists the best set is the single largest element.
        seen = set()
        total = 0
        for v in nums:
            if v > 0 and v not in seen:
                seen.add(v)
                total += v
        if seen:
            return total
        return max(nums)
