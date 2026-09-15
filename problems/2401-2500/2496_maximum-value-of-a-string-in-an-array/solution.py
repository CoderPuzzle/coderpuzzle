from typing import List


class Solution:
    def maximumValue(self, strs: List[str]) -> int:
        # Digits-only strings count as their base-10 numeric value
        # (leading zeros just fold away); everything else counts by its
        # length. One pass keeps the running maximum.
        best = 0
        for s in strs:
            best = max(best, int(s) if s.isdigit() else len(s))
        return best
