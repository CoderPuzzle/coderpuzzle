from typing import List


class Solution:
    def smallestIndex(self, nums: List[int]) -> int:
        # First index whose digit sum equals the index wins, so a single
        # left-to-right scan with an early return is all there is. Values
        # are at most 1000, so each digit sum is at most 27 -- well below
        # any index bound of 100.
        for i, v in enumerate(nums):
            s = 0
            while v > 0:
                s += v % 10
                v //= 10
            if s == i:
                return i
        return -1
