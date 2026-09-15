from typing import List, Optional


class Solution:
    def splitArray(self, nums: List[int], k: int) -> int:
        def feasible(limit):
            # Greedy piece count under the limit: extending each piece as far
            # as possible never forces more pieces later.
            pieces, current = 1, 0
            for value in nums:
                if current + value > limit:
                    pieces += 1
                    current = value
                    if pieces > k:
                        return False
                else:
                    current += value
            return True

        # Binary-search the answer: the smallest limit for which k pieces
        # suffice (the piece count only falls as the limit rises). Bounds:
        # no element can be split, and one piece covering everything works.
        lo, hi = max(nums), sum(nums)
        while lo < hi:
            mid = (lo + hi) // 2
            if feasible(mid):
                hi = mid
            else:
                lo = mid + 1
        return lo
