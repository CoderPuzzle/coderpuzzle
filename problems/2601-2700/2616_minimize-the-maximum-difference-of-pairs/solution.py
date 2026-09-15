from typing import List, Optional


class Solution:
    def minimizeMax(self, nums: List[int], p: int) -> int:
        # An optimal selection can always pair adjacent sorted values, so
        # sort once and ask: does a cap `diff` admit p disjoint pairs?
        nums = sorted(nums)
        n = len(nums)

        def can(diff):
            # Greedy scan: take every adjacent pair within diff and skip one
            # element otherwise. Taking each cheap pair is safe (exchange
            # argument), so this counts the maximum pairs under the cap.
            count = 0
            i = 1
            while i < n:
                if nums[i] - nums[i - 1] <= diff:
                    count += 1
                    i += 2
                else:
                    i += 1
            return count >= p

        # The predicate is monotone in diff — a larger cap only admits more
        # pairs — so binary search the minimum feasible cap over the value
        # span. p = 0 succeeds at 0 since the empty set's max is 0.
        lo, hi = 0, nums[-1] - nums[0]
        while lo < hi:
            mid = (lo + hi) // 2
            if can(mid):
                hi = mid
            else:
                lo = mid + 1
        return lo
