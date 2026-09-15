from typing import List


class Solution:
    def maximumProduct(self, nums: List[int], m: int) -> int:
        # A size-m subsequence with first index i and last index j exists
        # iff j >= i + m - 1. For m == 1 first and last are the same
        # element, so the answer is the best square. Otherwise sweep i
        # downward: the eligible window nums[i + m - 1:] grows by one
        # entry per step, so its max and min update in O(1), and one of
        # those two extremes is always the best partner for nums[i].
        n = len(nums)
        if m == 1:
            return max(v * v for v in nums)
        smax = smin = nums[n - 1]
        best = nums[n - m] * nums[n - 1]
        for i in range(n - m - 1, -1, -1):
            v = nums[i + m - 1]
            if v > smax:
                smax = v
            elif v < smin:
                smin = v
            best = max(best, nums[i] * smax, nums[i] * smin)
        return best
