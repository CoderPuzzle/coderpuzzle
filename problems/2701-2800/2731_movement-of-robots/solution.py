from typing import List, Optional


class Solution:
    def sumDistance(self, nums: List[int], s: str, d: int) -> int:
        # Collisions only swap identities, so final positions are x +/- d.
        MOD = 10**9 + 7
        pos = sorted(x + d if c == "R" else x - d for x, c in zip(nums, s))
        total = 0
        prefix = 0
        for i, p in enumerate(pos):
            total += p * i - prefix
            prefix += p
        return total % MOD
