from typing import List, Optional


class Solution:
    def maximumScore(self, nums: List[int], k: int) -> int:
        n = len(nums)
        best = nums[k]
        # Every good subarray contains k, so grow [lo, hi] outward from
        # (k, k); each intermediate interval is itself a candidate.
        lo = hi = k
        cur_min = nums[k]
        while lo > 0 or hi < n - 1:
            if lo == 0:
                hi += 1
                cand = nums[hi]
            elif hi == n - 1:
                lo -= 1
                cand = nums[lo]
            # Take the larger boundary element: both sides end up absorbed
            # anyway, so deferring the smaller one keeps the running minimum
            # as high as possible at the current width.
            elif nums[lo - 1] >= nums[hi + 1]:
                lo -= 1
                cand = nums[lo]
            else:
                hi += 1
                cand = nums[hi]
            if cand < cur_min:
                cur_min = cand
            # min x width; scoring every step covers every width 1..n.
            score = cur_min * (hi - lo + 1)
            if score > best:
                best = score
        return best
