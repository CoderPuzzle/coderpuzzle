from typing import List, Optional
from bisect import bisect_left, bisect_right


class Solution:
    def kthSmallestProduct(self, nums1: List[int], nums2: List[int], k: int) -> int:
        def _ceil_div(a, b):
            # ceil(a / b) for any non-zero b (Python floored division)
            return -((-a) // b)

        def _count_le(v):
            cnt = 0
            n2 = len(nums2)
            for x in nums1:
                if x > 0:
                    # x * y <= v  ->  y <= floor(v / x)
                    cnt += bisect_right(nums2, v // x)
                elif x < 0:
                    # x * y <= v, x < 0  ->  y >= ceil(v / x)
                    cnt += n2 - bisect_left(nums2, _ceil_div(v, x))
                else:
                    # x == 0: product is 0
                    if v >= 0:
                        cnt += n2
            return cnt

        lo, hi = -(10**10) - 1, 10**10 + 1
        while lo < hi:
            mid = (lo + hi) // 2
            if _count_le(mid) >= k:
                hi = mid
            else:
                lo = mid + 1
        return lo
