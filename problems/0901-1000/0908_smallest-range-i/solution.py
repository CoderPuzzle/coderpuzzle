from typing import List


class Solution:
    def smallestRangeI(self, nums: List[int], k: int) -> int:
        # Only the two ends matter: each element can travel at most k, so the
        # best plan lifts the minimum and lowers the maximum by k each.
        low = high = nums[0]
        for value in nums[1:]:
            if value < low:
                low = value
            elif value > high:
                high = value
        # The span shrinks by 2k at best and a score can never go below zero.
        return max(0, high - low - 2 * k)
