from typing import List, Optional


class Solution:
    def sumOfUnique(self, nums: List[int]) -> int:
        # An element counts only if it appears exactly once. Values are
        # bounded to 1..100, so a fixed frequency table settles every
        # element in one pass; a second sweep sums the singletons.
        count = [0] * 101
        for v in nums:
            count[v] += 1
        return sum(v for v in nums if count[v] == 1)
