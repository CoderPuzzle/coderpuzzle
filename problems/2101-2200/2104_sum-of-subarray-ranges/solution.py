from typing import List, Optional


class Solution:
    def subArrayRanges(self, nums: List[int]) -> int:
        n = len(nums)
        total = 0
        for i in range(n):
            # Extending nums[i..j-1] by nums[j] updates the range in O(1):
            # only the new element can tighten mn or raise mx.
            mn = mx = nums[i]
            # j starts at i+1, skipping length-1 subarrays (range 0).
            for j in range(i + 1, n):
                # elif is safe: one element can't be both a strict new
                # minimum and a strict new maximum.
                if nums[j] < mn:
                    mn = nums[j]
                elif nums[j] > mx:
                    mx = nums[j]
                total += mx - mn
        return total
