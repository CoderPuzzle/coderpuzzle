from typing import List, Optional


class Solution:
    def minimizeArrayValue(self, nums: List[int]) -> int:
        # Value only moves leftward, so each prefix's max is at least its
        # ceiling average; the max over all prefixes is also achievable by
        # balancing each prefix to that ceiling.
        total = 0
        best = 0
        for i, value in enumerate(nums):
            total += value
            # ceil(total / (i+1)) via integer arithmetic.
            candidate = (total + i) // (i + 1)
            if candidate > best:
                best = candidate
        return best
