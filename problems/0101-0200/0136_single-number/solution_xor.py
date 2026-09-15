from typing import List, Optional


class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        # XOR fold: x ^ x = 0 cancels each pair, x ^ 0 = x passes the lone
        # value through, and commutativity makes grouping order irrelevant.
        result = 0
        for value in nums:
            result ^= value
        # Only the unpaired element survives in the accumulator.
        return result
