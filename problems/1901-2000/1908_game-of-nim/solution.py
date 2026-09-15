from typing import List


class Solution:
    def nimGame(self, piles: List[int]) -> bool:
        # Bouton's theorem: the mover loses exactly when the XOR of all
        # piles (the nim-sum) is 0. From a zero nim-sum every move leaves
        # a nonzero one, and from a nonzero nim-sum some move restores 0,
        # so the player facing 0 is eventually the one stuck with no move.
        result = 0
        for p in piles:
            result ^= p
        return result != 0
