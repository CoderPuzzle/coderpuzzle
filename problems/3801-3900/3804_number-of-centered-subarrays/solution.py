from typing import List, Optional


class Solution:
    def centeredSubarrays(self, nums: List[int]) -> int:
        # Anchor the left end and grow the right, carrying the window sum
        # and a counter of the values currently inside the window. The
        # window [i..j] is centered exactly when its running total is one
        # of the values the counter holds, so the membership check is a
        # constant-time lookup rather than a rescan of the window.
        n = len(nums)
        count = 0
        for i in range(n):
            window = {}
            total = 0
            for j in range(i, n):
                total += nums[j]
                window[nums[j]] = window.get(nums[j], 0) + 1
                if window.get(total, 0) > 0:
                    count += 1
        return count
