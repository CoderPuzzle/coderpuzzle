from typing import List, Optional


class Solution:
    def maxAscendingSum(self, nums: List[int]) -> int:
        # One sweep: cur is the sum of the strictly increasing run
        # ending here; extend it while the values strictly rise,
        # restart at the bare element otherwise (equal neighbours
        # break the run). Every value is positive, so the fullest
        # run ending at each index is its best subarray. n * max
        # <= 10^4 and strict ascent forces distinct values, capping
        # the true maximum at 5050 - far inside 32-bit range.
        best = cur = nums[0]
        for i in range(1, len(nums)):
            cur = cur + nums[i] if nums[i] > nums[i - 1] else nums[i]
            best = max(best, cur)
        return best
