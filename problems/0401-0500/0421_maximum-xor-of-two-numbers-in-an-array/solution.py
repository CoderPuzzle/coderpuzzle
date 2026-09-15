from typing import List, Optional


class Solution:
    def findMaximumXOR(self, nums: List[int]) -> int:
        best = 0
        mask = 0
        # Decide each answer bit from the MSB down: a set higher bit dominates
        # all lower bits, so keep it whenever some pair achieves it.
        for bit in range(30, -1, -1):
            mask |= 1 << bit
            # Prefixes = numbers truncated to the bits considered so far.
            prefixes = {value & mask for value in nums}
            candidate = best | (1 << bit)
            # Achievable iff two prefixes XOR to candidate, i.e. candidate ^ p
            # is itself a prefix; otherwise this bit stays 0.
            if any((candidate ^ prefix) in prefixes for prefix in prefixes):
                best = candidate
        return best
