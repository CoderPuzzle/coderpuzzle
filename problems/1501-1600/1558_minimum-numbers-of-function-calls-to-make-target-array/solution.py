from typing import List, Optional


class Solution:
    def minOperations(self, nums: List[int]) -> int:
        # Each element's popcount is the number of independent increments it
        # needs; the doublings are shared by the whole array, so only the
        # element with the most bits sets how many doublings are needed.
        total = 0
        max_bits = 0
        for v in nums:
            total += bin(v).count("1")
            max_bits = max(max_bits, v.bit_length())
        return total + max(max_bits - 1, 0)
