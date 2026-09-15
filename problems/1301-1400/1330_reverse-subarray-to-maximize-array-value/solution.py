from typing import List


class Solution:
    def maxValueAfterReverse(self, nums: List[int]) -> int:
        # Reversing [L, R] only rewires the two boundary links. Gains split
        # into: prefix/suffix reversals (one boundary term each) and interior
        # reversals, bounded by 2*(max adjacent min - min adjacent max).
        n = len(nums)
        total = sum(abs(nums[i] - nums[i + 1]) for i in range(n - 1))
        best_gain = 0
        big = float("-inf")  # max over adjacent-pair minima
        small = float("inf")  # min over adjacent-pair maxima
        for i in range(n - 1):
            a, b = nums[i], nums[i + 1]
            best_gain = max(best_gain, abs(nums[0] - b) - abs(a - b))  # reverse [0..i]
            best_gain = max(best_gain, abs(nums[-1] - a) - abs(a - b))  # reverse [i+1..n-1]
            big = max(big, min(a, b))
            small = min(small, max(a, b))
        if big > small:
            best_gain = max(best_gain, 2 * (big - small))
        return total + best_gain
