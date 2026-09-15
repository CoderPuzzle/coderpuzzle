from typing import List


class Solution:
    def longestSubsequence(self, nums: List[int]) -> int:
        # XOR is self-inverse and order-free, so the whole array's XOR decides
        # everything: non-zero means take all of it.
        total = 0
        seen_nonzero = False
        for value in nums:
            total ^= value
            seen_nonzero = seen_nonzero or value != 0
        # A zero total is repaired by dropping one non-zero element (the rest
        # then XORs to that element); all zeros leave nothing worth taking.
        if total != 0:
            return len(nums)
        return len(nums) - 1 if seen_nonzero else 0
