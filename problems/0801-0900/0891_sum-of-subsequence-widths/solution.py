from typing import List, Optional


class Solution:
    def sumSubseqWidths(self, nums: List[int]) -> int:
        MOD = 10**9 + 7
        # Width = max - min, so the total is the sum of subsequence maxes
        # minus mins; sorting loses nothing (inner order is irrelevant).
        nums = sorted(nums)
        n = len(nums)
        pow2 = [1] * n
        for i in range(1, n):
            pow2[i] = pow2[i - 1] * 2 % MOD
        total = 0
        for i, x in enumerate(nums):
            # x is the max of 2^i subsequences (partners chosen before it)
            # and the min of 2^(n-1-i); each subsequence is booked to exactly
            # one index per role. The per-term difference may be negative
            # before reduction; Python's % always returns non-negative.
            total = (total + x * (pow2[i] - pow2[n - 1 - i])) % MOD
        return total
