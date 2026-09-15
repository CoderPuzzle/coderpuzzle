from typing import List, Optional


class Solution:
    def minimumSteps(self, s: str) -> int:
        # Swaps only happen between adjacent balls, and two balls of the
        # same color never need to cross, so the minimum number of swaps
        # is exactly the number of (1, 0) inversions: each 1 must pass
        # every 0 sitting to its right. One right-to-left sweep counts
        # them — accumulate the zeros seen so far and add that to the
        # answer at every 1.
        total = 0
        zeros = 0
        for ch in reversed(s):
            if ch == "0":
                zeros += 1
            else:
                total += zeros
        return total
