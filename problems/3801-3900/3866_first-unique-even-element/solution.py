from typing import List, Optional


class Solution:
    def firstUniqueEven(self, nums: List[int]) -> int:
        # A value qualifies only when it is even and its count in nums is
        # exactly one. Counting all values first turns each "is this the
        # first unique even?" test into a constant-time lookup, so a single
        # left-to-right scan over nums returns the earliest match.
        counts = {}
        for value in nums:
            counts[value] = counts.get(value, 0) + 1
        for value in nums:
            if value % 2 == 0 and counts[value] == 1:
                return value
        return -1
