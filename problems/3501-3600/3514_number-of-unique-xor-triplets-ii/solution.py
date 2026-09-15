from typing import List


class Solution:
    def uniqueXorTriplets(self, nums: List[int]) -> int:
        # The ordering i <= j <= k only picks which indices feed the XOR, and
        # XOR ignores order, so every triplet value is (pair XOR) ^ (third
        # element). Collect all pairwise XORs once, then spread them by every
        # element; values stay below 2^11, so both sets hold <= 2048 entries.
        pairs = {a ^ b for a in nums for b in nums}
        triplets = {p ^ v for p in pairs for v in nums}
        return len(triplets)
