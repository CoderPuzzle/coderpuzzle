from typing import List


class Solution:
    def maximumTotalCost(self, nums: List[int]) -> int:
        # Splitting is only ever worth it to make a negative element flip
        # sign, and a subarray forces alternating signs from its head — so
        # per element there are two states: it keeps its phase-plus sign
        # (free to continue or restart after a worst-so-far prefix) or it
        # rides in as negated, which requires the previous element to have
        # kept its sign. The seeds are exactly hint dp[1][*]; two rolling
        # variables carry the table.
        n = len(nums)
        if n == 1:
            return nums[0]
        keep, flip = nums[0] + nums[1], nums[0] - nums[1]
        for i in range(2, n):
            keep, flip = max(keep, flip) + nums[i], keep - nums[i]
        return max(keep, flip)
