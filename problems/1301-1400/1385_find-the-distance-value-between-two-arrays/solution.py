from bisect import bisect_left
from typing import List


class Solution:
    def findTheDistanceValue(self, arr1: List[int], arr2: List[int], d: int) -> int:
        arr2 = sorted(arr2)
        count = 0
        for value in arr1:
            i = bisect_left(arr2, value)
            close = (i < len(arr2) and arr2[i] - value <= d) or (i > 0 and value - arr2[i - 1] <= d)
            if not close:
                count += 1
        return count
