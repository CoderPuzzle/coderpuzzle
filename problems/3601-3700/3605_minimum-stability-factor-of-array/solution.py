from typing import List
from math import gcd


class Solution:
    def minStable(self, nums: List[int], maxC: int) -> int:
        n = len(nums)

        # Sparse table: st[k][i] is the gcd of nums[i .. i+2^k-1]. Two rows
        # tile any query window, so every window gcd is O(1) after the
        # O(n log n) build.
        LOG = n.bit_length()
        st = [nums[:]]
        for k in range(1, LOG):
            half = 1 << (k - 1)
            prev = st[-1]
            row = [0] * (n - (1 << k) + 1)
            for i in range(len(row)):
                row[i] = gcd(prev[i], prev[i + half])
            st.append(row)

        def range_gcd(left: int, right: int) -> int:
            k = (right - left + 1).bit_length() - 1
            span = 1 << k
            return gcd(st[k][left], st[k][right - span + 1])

        # Feasibility for a target length k: every window of size k+1 must
        # be broken. Editing one element to 1 breaks every window that
        # contains it, so hitting a window's rightmost element covers the
        # maximal run of later window starts — the classic fixed-length
        # interval point cover, greedily optimal.
        def feasible(k: int) -> bool:
            width = k + 1
            if width > n:
                return True
            edits = 0
            covered = -1
            for start in range(n - width + 1):
                if start <= covered:
                    continue
                if range_gcd(start, start + width - 1) > 1:
                    covered = start + width - 1
                    edits += 1
                    if edits > maxC:
                        return False
            return True

        lo, hi = 0, n
        while lo < hi:
            mid = (lo + hi) // 2
            if feasible(mid):
                hi = mid
            else:
                lo = mid + 1
        return lo
