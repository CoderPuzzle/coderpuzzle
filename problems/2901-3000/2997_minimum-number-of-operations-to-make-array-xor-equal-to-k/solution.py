from typing import List, Optional


class Solution:
    def minOperations(self, nums: List[int], k: int) -> int:
        # Flipping one bit of any element toggles exactly that bit of the
        # array-wide XOR, so one operation changes the XOR's Hamming
        # distance to k by exactly one: fold nums into a single XOR and
        # count the bits where it differs from k.
        xor_all = 0
        for v in nums:
            xor_all ^= v
        return (xor_all ^ k).bit_count()
