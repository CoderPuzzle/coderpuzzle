from typing import List, Optional


class Solution:
    def minOperations(self, s: str) -> int:
        # Exactly two alternating targets exist; each position matches
        # one of them, so one mismatch count against the 0101... target
        # determines both costs.
        mismatch = sum(1 for i, c in enumerate(s) if int(c) != i % 2)
        return min(mismatch, len(s) - mismatch)
