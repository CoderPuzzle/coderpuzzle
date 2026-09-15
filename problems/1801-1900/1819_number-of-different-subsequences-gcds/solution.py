from typing import List, Optional
from math import gcd


class Solution:
    def countDifferentSubsequenceGCDs(self, nums: List[int]) -> int:
        present = set(nums)
        max_val = max(nums)
        count = 0
        # g is achievable iff the gcd of ALL present multiples of g is exactly g:
        # taking every divisible element minimizes the gcd, so no other subset can do better.
        for g in range(1, max_val + 1):
            running = 0  # gcd(0, x) = x, so 0 is the identity seed
            for multiple in range(g, max_val + 1, g):
                if multiple in present:
                    running = gcd(running, multiple)
                    if running == g:
                        # Folding more multiples can only shrink the gcd — confirmed, stop early.
                        count += 1
                        break
        return count
