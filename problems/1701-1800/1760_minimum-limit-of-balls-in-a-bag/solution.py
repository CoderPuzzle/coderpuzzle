from typing import List, Optional


class Solution:
    def minimumSize(self, nums: List[int], maxOperations: int) -> int:
        def needed(penalty):
            # A bag of v must end as ceil(v/penalty) pieces; each division
            # creates exactly one new bag, so it costs ceil(v/penalty) - 1 =
            # (v - 1) // penalty operations — achievable with near-equal
            # splits, all of size <= penalty.
            total = 0
            for balls in nums:
                total += (balls - 1) // penalty
            return total

        # Achievability is monotone in the penalty, so binary search the
        # smallest feasible value; max(nums) needs zero operations.
        lo, hi = 1, max(nums)
        while lo < hi:
            mid = (lo + hi) // 2
            if needed(mid) <= maxOperations:
                hi = mid
            else:
                lo = mid + 1
        return lo
