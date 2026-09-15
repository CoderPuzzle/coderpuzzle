from typing import List


class Solution:
    def findKthPositive(self, arr: List[int], k: int) -> int:
        n = len(arr)

        # A gapless array would have arr[i] = i + 1, so missing(i) counts
        # the positive integers absent up through arr[i]; it is
        # non-decreasing.
        def missing(i: int) -> int:
            return arr[i] - (i + 1)

        # Smallest index whose missing count reaches k; hi = n lets the
        # search converge past the end when the whole array falls short.
        lo, hi = 0, n
        while lo < hi:
            mid = (lo + hi) // 2
            if missing(mid) < k:
                lo = mid + 1
            else:
                hi = mid
        # Every index before lo accounts for fewer than k missing numbers,
        # so the kth missing positive is exactly k past that point.
        return lo + k
