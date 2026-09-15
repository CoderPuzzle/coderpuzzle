from typing import List


class Solution:
    def minimumOperations(self, nums: List[int]) -> int:
        # Elements are independent: each operation touches exactly one
        # element, so every element needs only the distance from its
        # nearest multiple of 3 — a remainder of 1 or 2 costs exactly one
        # +/- 1, remainder 0 costs nothing.
        return sum(min(v % 3, (3 - v % 3) % 3) for v in nums)
