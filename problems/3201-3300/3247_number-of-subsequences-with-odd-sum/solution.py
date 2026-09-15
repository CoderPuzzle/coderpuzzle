from typing import List


class Solution:
    def subsequenceCount(self, nums: List[int]) -> int:
        # Carry the count of even-sum and odd-sum subsequences of the
        # scanned prefix; an even element doubles both counts, an odd one
        # makes both counts their sum. Reduced mod 10**9 + 7 each step.
        mod = 10**9 + 7
        even, odd = 1, 0
        for num in nums:
            if num % 2 != 0:
                merged = (even + odd) % mod
                even, odd = merged, merged
            else:
                even, odd = even * 2 % mod, odd * 2 % mod
        return odd
