from typing import List


class Solution:
    def rob(self, nums: List[int]) -> int:
        # A lone house has no distinct neighbor on either side, so robbing it
        # is legal even though both "give up an end" sweeps below see nothing.
        if len(nums) == 1:
            return nums[0]

        def line(houses: List[int]) -> int:
            # Rolling two-variable DP: cur is the best through house i-1, prev
            # the best through i-2, so no DP table is ever allocated.
            prev, cur = 0, 0
            for money in houses:
                prev, cur = cur, max(cur, prev + money)
            return cur

        # The circle's only extra edge over the line joins the first and last
        # houses, so every legal plan gives up the first house or the last:
        # solve the linear street on nums[1:] and nums[:-1], keep the better.
        return max(line(nums[1:]), line(nums[:-1]))
