from typing import List


class Solution:
    def findSpecialInteger(self, arr: List[int]) -> int:
        # A value covering more than a quarter of the array must span at
        # least one of the positions n/4, n/2, 3n/4 (a run longer than n/4
        # cannot fit between two consecutive quarter marks). Each candidate
        # is verified by binary-searching its first and last occurrence.
        def first(value):
            lo, hi = 0, len(arr)
            while lo < hi:
                mid = (lo + hi) // 2
                if arr[mid] < value:
                    lo = mid + 1
                else:
                    hi = mid
            return lo

        def last(value):
            lo, hi = 0, len(arr)
            while lo < hi:
                mid = (lo + hi) // 2
                if arr[mid] <= value:
                    lo = mid + 1
                else:
                    hi = mid
            return lo - 1

        n = len(arr)
        for probe in (n // 4, n // 2, 3 * n // 4):
            candidate = arr[probe]
            if last(candidate) - first(candidate) + 1 > n // 4:
                return candidate
        return arr[n - 1]
