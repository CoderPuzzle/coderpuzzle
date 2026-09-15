from typing import List


class Solution:
    def fixedPoint(self, arr: List[int]) -> int:
        lo, hi = 0, len(arr) - 1
        while lo < hi:
            mid = (lo + hi) // 2
            if arr[mid] - mid >= 0:
                hi = mid
            else:
                lo = mid + 1
        return lo if arr[lo] == lo else -1
