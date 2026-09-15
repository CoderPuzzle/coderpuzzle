from typing import List, Optional


class Solution:
    def findMin(self, nums: List[int]) -> int:
        lo = 0
        hi = len(nums) - 1
        while lo < hi:
            mid = (lo + hi) // 2
            # Compare against the right end: a live window endpoint whose
            # verdict stays correct even when the array was not rotated.
            if nums[mid] > nums[hi]:
                # The drop (start of the second ascending run) is right of mid.
                lo = mid + 1
            else:
                # mid..hi is non-decreasing: the minimum is at mid or left of it.
                hi = mid
        # lo and hi meet on the single survivor.
        return nums[lo]
