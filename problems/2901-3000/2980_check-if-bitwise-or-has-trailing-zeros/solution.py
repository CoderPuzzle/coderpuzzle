from typing import List


class Solution:
    def hasTrailingZeros(self, nums: List[int]) -> bool:
        # A trailing zero means the value is even. OR never unsets a bit,
        # so a selection's OR ends in 0 iff every selected element ends
        # in 0 — the question is whether two or more even elements exist.
        # Count them in one pass; the values are at most 100, so parity
        # by bitwise-and is safe in every language.
        evens = 0
        for value in nums:
            if value & 1 == 0:
                evens += 1
        return evens >= 2
