from typing import List, Optional


class Solution:
    def missingNumber(self, nums: List[int]) -> int:
        n = len(nums)
        # n distinct values drawn from 0..n: exactly one is absent, and it is
        # the full-range total minus the sum of what is actually present.
        # The division is exact because consecutive n and n+1 multiply to even.
        return n * (n + 1) // 2 - sum(nums)
