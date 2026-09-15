from typing import List, Optional
from bisect import bisect_left


class Solution:
    def minimumDifference(self, nums: List[int]) -> int:
        half = len(nums) // 2

        # Bucket each half's subset sums by how many elements produced them;
        # a half of length <= 15 keeps this at most 2^15 entries.
        def subset_sums_by_count(arr):
            m = len(arr)
            res = [[] for _ in range(m + 1)]
            for mask in range(1 << m):
                cnt = bin(mask).count("1")
                total = 0
                for i, v in enumerate(arr):
                    if mask >> i & 1:
                        total += v
                res[cnt].append(total)
            return res

        # If the first half contributes c elements with sum a, the second half
        # must contribute exactly half-c elements with sum b — both sides then
        # have `half` elements and difference |total - 2(a+b)|.
        A = subset_sums_by_count(nums[:half])
        B = subset_sums_by_count(nums[half:])
        total = sum(nums)
        ans = float("inf")
        for c in range(half + 1):
            Bc = sorted(B[half - c])  # sorted once per count class
            for a in A[c]:
                # b >= total/2 - a  <=>  2*b >= total - 2*a (exact integers)
                want = total - 2 * a
                lo, hi = 0, len(Bc)
                while lo < hi:
                    mid = (lo + hi) // 2
                    if 2 * Bc[mid] < want:
                        lo = mid + 1
                    else:
                        hi = mid
                # The closest b sits on one side of the insertion point — try both.
                idx = lo
                if idx < len(Bc):
                    d = abs(total - 2 * (a + Bc[idx]))
                    if d < ans:
                        ans = d
                if idx > 0:
                    d = abs(total - 2 * (a + Bc[idx - 1]))
                    if d < ans:
                        ans = d
        return ans
