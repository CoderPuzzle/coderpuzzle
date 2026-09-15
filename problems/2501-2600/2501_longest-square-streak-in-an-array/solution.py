from math import isqrt
from typing import List


class Solution:
    def longestSquareStreak(self, nums: List[int]) -> int:
        # A sorted streak always steps v -> v*v, so scanning the distinct
        # values ascending makes each value extend at most one chain: the
        # one ending at its integer square root, when that root is itself
        # present. Values stay below 10^5, so every product is tiny.
        length = {}
        for value in sorted(set(nums)):
            root = isqrt(value)
            length[value] = length.get(root, 0) + 1 if root * root == value else 1
        longest = max(length.values())
        return longest if longest >= 2 else -1
