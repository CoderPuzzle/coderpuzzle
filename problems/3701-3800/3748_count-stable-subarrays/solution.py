from bisect import bisect_left
from typing import List


class Solution:
    def countStableSubarrays(self, nums: List[int], queries: List[List[int]]) -> List[int]:
        # left[i] is the smallest start s such that nums[s..i] reads
        # non-decreasing; it only ever moves right, which the per-query
        # binary search below relies on.
        n = len(nums)
        left = [0] * n
        pref_left = [0] * (n + 1)
        pref_base = [0] * (n + 1)
        for i, value in enumerate(nums):
            left[i] = left[i - 1] if i and value >= nums[i - 1] else i
            # Stable subarrays ending at i inside their own run.
            pref_left[i + 1] = pref_left[i] + left[i]
            pref_base[i + 1] = pref_base[i] + i - left[i] + 1
        result = []
        for l, r in queries:
            # First end whose run reaches back to l or earlier. Ends before
            # it sit past a drop at or after l and count their bare window
            # length; ends from there on count down to left[e].
            p = bisect_left(left, l, l, r + 1)
            result.append(pref_base[r + 1] - pref_base[l] + pref_left[p] - pref_left[l] - l * (p - l))
        return result
