from typing import List


class Solution:
    def findFinalValue(self, nums: List[int], original: int) -> int:
        # One O(1) hash-set lookup per doubling step replaces a fresh scan
        # of nums each time; values stay <= 2048 (double the 1000 cap), so
        # no type ever comes close to overflowing.
        seen = set(nums)
        while original in seen:
            original *= 2
        return original
