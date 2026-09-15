from typing import List


class Solution:
    def minCostToMoveChips(self, position: List[int]) -> int:
        # A +-2 move is free, so only parity matters; a +-1 move flips it
        # at cost 1. Pay for whichever side has fewer chips.
        odd = sum(p % 2 for p in position)
        return min(odd, len(position) - odd)
