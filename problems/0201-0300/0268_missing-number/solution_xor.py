from typing import List, Optional


class Solution:
    def missingNumber(self, nums: List[int]) -> int:
        # Seed with n — the one index the loop below never visits — then
        # fold every index 0..n-1 and every element into one accumulator.
        result = len(nums)
        for i, value in enumerate(nums):
            # Each present value matches an index and cancels it; the absent
            # value pairs with nothing and survives the fold.
            result ^= i ^ value
        return result
