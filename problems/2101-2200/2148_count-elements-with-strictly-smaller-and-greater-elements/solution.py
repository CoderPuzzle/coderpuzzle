from typing import List, Optional


class Solution:
    def countElements(self, nums: List[int]) -> int:
        # An element qualifies exactly when it sits strictly between the
        # array's minimum and maximum: a strictly smaller witness exists
        # iff x > min, a strictly larger one iff x < max.
        lo, hi = min(nums), max(nums)
        return sum(1 for x in nums if lo < x < hi)
