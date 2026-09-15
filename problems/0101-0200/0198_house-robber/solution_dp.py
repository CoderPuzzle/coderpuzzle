from typing import List, Optional


class Solution:
    def rob(self, nums: List[int]) -> int:
        # Rolling two-variable DP: cur = best through house i-1, prev = best
        # through house i-2; both start at 0 ("nothing robbed yet").
        prev, cur = 0, 0
        for x in nums:
            # Skip this house (keep cur) or rob it (prev + x); the tuple
            # assignment advances both values with no temporary array.
            prev, cur = cur, max(cur, prev + x)
        return cur
