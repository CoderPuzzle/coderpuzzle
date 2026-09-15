from typing import List, Optional


class Solution:
    def minimumSum(self, nums: List[int]) -> int:
        # The best mountain through a peak j pairs nums[j] with the smallest
        # value on each side, so running minima from both ends bracket every
        # candidate; both side values must sit strictly below the peak.
        n = len(nums)
        left_min = nums[:]
        for i in range(1, n):
            left_min[i] = min(left_min[i - 1], nums[i])
        right_min = nums[:]
        for i in range(n - 2, -1, -1):
            right_min[i] = min(right_min[i + 1], nums[i])
        best = -1
        for j in range(1, n - 1):
            low, high = left_min[j - 1], right_min[j + 1]
            if low < nums[j] and high < nums[j]:
                total = low + nums[j] + high
                if best == -1 or total < best:
                    best = total
        return best
