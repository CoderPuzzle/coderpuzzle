from typing import List


class Solution:
    def heightChecker(self, heights: List[int]) -> int:
        # The expected order is just heights sorted into non-decreasing
        # order. Compare position-by-position and count every mismatch.
        expected = sorted(heights)
        return sum(1 for a, b in zip(heights, expected) if a != b)
