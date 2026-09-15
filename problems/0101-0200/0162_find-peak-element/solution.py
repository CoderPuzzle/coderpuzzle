from typing import List, Optional


class Solution:
    def findPeakElement(self, nums: List[int]) -> int:
        n = len(nums)
        # Left-to-right scan stopping at the first descent — the direct way to
        # return the leftmost peak, which binary search cannot guarantee.
        for i in range(n):
            # Positions just outside the array count as -infinity, so the
            # boundary checks pass vacuously at the ends.
            left_ok = i == 0 or nums[i] > nums[i - 1]
            right_ok = i == n - 1 or nums[i] > nums[i + 1]
            if left_ok and right_ok:
                return i
        # Unreachable: some peak always exists.
        return -1
