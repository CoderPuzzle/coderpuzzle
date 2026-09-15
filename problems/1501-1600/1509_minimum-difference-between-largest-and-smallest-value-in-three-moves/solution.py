from typing import List


class Solution:
    def minDifference(self, nums: List[int]) -> int:
        n = len(nums)
        # Four or fewer elements can all be pulled to one value in at most
        # three moves.
        if n <= 4:
            return 0
        nums = sorted(nums)
        # Try each of the four ways to split three removals between the low
        # end and the high end of the sorted array.
        return min(nums[n - 4 + i] - nums[i] for i in range(4))
