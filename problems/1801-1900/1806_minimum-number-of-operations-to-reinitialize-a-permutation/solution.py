from typing import List, Optional


class Solution:
    def reinitializePermutation(self, n: int) -> int:
        # The step sends the entry at old position p to slot 2p when 2p < n
        # and to slot 2p - n + 1 otherwise: even slot 2j fills from old j,
        # odd slot 2j+1 from old n/2 + j, with 0 and n-1 pinned. For
        # 1 <= p <= n-2 that landing slot is 2p mod (n-1), so every mobile
        # index is home again exactly when 2^k == 1 (mod n-1) -- precisely
        # when index 1, a unit, is home. Chasing index 1 through the
        # piecewise form (the folded mod form degenerates at n = 2, where
        # index 1 is the pinned endpoint n-1) counts the shuffle's order;
        # at most n-2 rounds run and every value stays below 2n <= 2000,
        # so 32-bit arithmetic is honest everywhere.
        i = 1
        k = 0
        while k == 0 or i != 1:
            i = 2 * i if 2 * i < n else 2 * i - n + 1
            k += 1
        return k
