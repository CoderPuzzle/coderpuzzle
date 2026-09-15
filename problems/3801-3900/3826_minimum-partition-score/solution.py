from typing import List, Optional


class Solution:
    def minPartitionScore(self, nums: List[int], k: int) -> int:
        # Bounds: n <= 1000 and nums[i] <= 10^4, so every prefix sum is at
        # most 10^7 and every subarray value s*(s+1)/2 at most ~5*10^13.
        # Python ints are exact, so no overflow is possible.
        n = len(nums)
        prefix = [0] * (n + 1)
        for i, x in enumerate(nums):
            prefix[i + 1] = prefix[i] + x

        def value(s: int) -> int:
            return s * (s + 1) // 2

        # dp over "exactly j subarrays covering the first i elements".
        # Layer j only needs i in [j, n-k+j]: at least j elements for j
        # blocks, and at least one element per remaining k-j blocks.
        if k == 1:
            return value(prefix[n])
        prev = [None] * (n + 1)
        for i in range(1, n - k + 2):
            prev[i] = value(prefix[i])
        cur = [None] * (n + 1)

        def solve(lo: int, hi: int, opt_lo: int, opt_hi: int) -> None:
            # The cost prev[t] + value(P[i]-P[t]) satisfies the quadrangle
            # inequality because value is convex, so the best split point
            # is non-decreasing in i: search [opt_lo, opt_hi] only, and
            # recurse with the found point splitting the candidate range.
            if lo > hi:
                return
            mid = (lo + hi) // 2
            best = None
            best_t = opt_lo
            hi_t = min(opt_hi, mid - 1)
            p_mid = prefix[mid]
            for t in range(opt_lo, hi_t + 1):
                s = p_mid - prefix[t]
                v = prev[t] + s * (s + 1) // 2
                if best is None or v < best:
                    best = v
                    best_t = t
            cur[mid] = best
            solve(lo, mid - 1, opt_lo, best_t)
            solve(mid + 1, hi, best_t, opt_hi)

        for j in range(2, k + 1):
            solve(j, n - k + j, j - 1, n - k + j - 1)
            prev, cur = cur, prev
        return prev[n]
