from typing import List


class Solution:
    def maxArrayValue(self, nums: List[int]) -> int:
        pile = nums[-1]
        best = pile
        for i in range(len(nums) - 2, -1, -1):
            if pile >= nums[i]:
                pile += nums[i]
            else:
                pile = nums[i]
            best = max(best, pile)
        return best
