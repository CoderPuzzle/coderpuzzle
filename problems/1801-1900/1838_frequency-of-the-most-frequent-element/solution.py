from typing import List, Optional


class Solution:
    def maxFrequency(self, nums: List[int], k: int) -> int:
        # Operations only raise values, so an optimal equal-value group is a
        # contiguous window in sorted order, raised to its right end.
        nums = sorted(nums)
        best = 1
        left = 0
        window_sum = 0
        for right, value in enumerate(nums):
            window_sum += value
            # Cost = width * target - window sum, the increments needed to
            # lift everything to the right end; drop the smallest member
            # while the budget is exceeded.
            while (right - left + 1) * value - window_sum > k:
                window_sum -= nums[left]
                left += 1
            # Once a length is affordable, every shorter window is too.
            best = max(best, right - left + 1)
        return best
