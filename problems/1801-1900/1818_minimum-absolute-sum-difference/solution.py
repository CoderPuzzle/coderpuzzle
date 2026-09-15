from bisect import bisect_left
from typing import List


class Solution:
    def minAbsoluteSumDiff(self, nums1: List[int], nums2: List[int]) -> int:
        # The initial sum is fixed; a replacement at index i can only cut
        # |nums1[i] - nums2[i]| down to the distance from nums2[i] to the
        # nearest value in nums1, so hunt that nearest value in a sorted
        # copy and keep the largest saving seen.
        MOD = 10**9 + 7
        sorted1 = sorted(nums1)
        total = 0
        best_gain = 0
        for a, b in zip(nums1, nums2):
            diff = abs(a - b)
            total += diff
            # neighbors of b in the sorted copy bracket the nearest value
            position = bisect_left(sorted1, b)
            nearest = diff
            if position < len(sorted1):
                nearest = min(nearest, sorted1[position] - b)
            if position > 0:
                nearest = min(nearest, b - sorted1[position - 1])
            best_gain = max(best_gain, diff - nearest)
        return (total - best_gain) % MOD
