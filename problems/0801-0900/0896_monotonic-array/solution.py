from typing import List


class Solution:
    def isMonotonic(self, nums: List[int]) -> bool:
        # Two hypotheses survive until refuted: a rise kills the decreasing
        # one, a drop kills the increasing one, equals keep both standing.
        increasing = True
        decreasing = True
        for i in range(1, len(nums)):
            if nums[i] > nums[i - 1]:
                decreasing = False
            elif nums[i] < nums[i - 1]:
                increasing = False
        return increasing or decreasing
