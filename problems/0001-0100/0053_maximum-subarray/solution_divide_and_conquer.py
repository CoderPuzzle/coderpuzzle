from typing import List, Optional


class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        # Each range answers four questions at once: total sum, best prefix,
        # best suffix, and best interior subarray. Merging two halves glues
        # them together, so one recursion describes the whole array.

        def solve(lo: int, hi: int) -> tuple[int, int, int, int]:
            # A single element is its own total, prefix, suffix, and best.
            if hi - lo == 1:
                x = nums[lo]
                return x, x, x, x
            mid = (lo + hi) // 2
            lt, lp, ls, lb = solve(lo, mid)
            rt, rp, rs, rb = solve(mid, hi)
            # The best subarray either stays in one half or is the seam of
            # the left half's best suffix and the right half's best prefix.
            total = lt + rt
            prefix = max(lp, lt + rp)
            suffix = max(rs, rt + ls)
            best = max(lb, rb, ls + rp)
            return total, prefix, suffix, best

        return solve(0, len(nums))[3]
