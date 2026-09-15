from typing import List


class Solution:
    def minimumAverage(self, nums: List[int]) -> float:
        # Every round pairs the current minimum with the current maximum;
        # after sorting, those are exactly nums[k] and nums[n-1-k]. All
        # values lie in 1..50, so each pair sum is <= 100 and the /2 is
        # exact in binary floating point (a sum is either an integer or
        # lands on x.5).
        nums.sort()
        best = 51.0
        n = len(nums)
        for k in range(n // 2):
            best = min(best, (nums[k] + nums[n - 1 - k]) / 2)
        return best
