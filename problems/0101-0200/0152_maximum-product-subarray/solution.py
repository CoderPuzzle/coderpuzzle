from typing import List, Optional


class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        # Seed with the first element so a single-element array returns itself.
        best = nums[0]
        # Extremes of subarray products ending exactly at the current index;
        # the minimum must be carried too because a negative factor reverses
        # the order and can turn the worst product into the next best.
        cur_max = cur_min = nums[0]
        for value in nums[1:]:
            # A negative incoming value swaps the extremes so the usual
            # candidate rules apply unchanged.
            if value < 0:
                cur_max, cur_min = cur_min, cur_max
            # Either start a fresh subarray at this value or extend.
            cur_max = max(value, cur_max * value)
            cur_min = min(value, cur_min * value)
            best = max(best, cur_max)
        return best
