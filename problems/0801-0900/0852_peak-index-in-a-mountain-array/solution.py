from typing import List


class Solution:
    def peakIndexInMountainArray(self, arr: List[int]) -> int:
        # Binary search on the slope: a rise past mid puts the peak to the
        # right of mid, a fall puts it at mid or to its left.
        lo = 0
        hi = len(arr) - 1
        while lo < hi:
            mid = (lo + hi) // 2
            if arr[mid] < arr[mid + 1]:
                # Still on the ascent, so the summit lies strictly right.
                lo = mid + 1
            else:
                # On the summit or the descent, so mid is safe to keep.
                hi = mid
        return lo
