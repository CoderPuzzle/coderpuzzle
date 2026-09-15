from typing import List


class Solution:
    def maxRotateFunction(self, nums: List[int]) -> int:
        n = len(nums)
        total = sum(nums)
        # F(0) weights each element by its index; every later rotation follows
        # from the recurrence, so only the running value is kept.
        best = cur = sum(i * value for i, value in enumerate(nums))
        for k in range(1, n):
            # One more rotation promotes every element's weight by 1 and
            # demotes nums[n-k] from weight n-1 to weight 0.
            cur += total - n * nums[n - k]
            best = max(best, cur)
        return best
