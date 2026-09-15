from typing import List, Optional


class Solution:
    def rob(self, nums: List[int], colors: List[int]) -> int:
        # Bounds: n <= 10^5 and nums[i] <= 10^5, so the rob-everything
        # extreme reaches 10^10 — exact in Python's integers.
        # prev1/prev2 carry dp[i-1]/dp[i-2]: the best haul from houses up
        # to i-1 / i-2. dp is monotone, so when colors differ the adjacent
        # take nums[i] + dp[i-1] dominates the non-adjacent nums[i] + dp[i-2].
        prev2 = 0
        prev1 = nums[0]
        for i in range(1, len(nums)):
            base = prev1 if colors[i] != colors[i - 1] else prev2
            take = nums[i] + base
            best = prev1 if prev1 > take else take
            prev2, prev1 = prev1, best
        return prev1
