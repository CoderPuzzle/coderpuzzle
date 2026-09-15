from typing import List


class Solution:
    def numEquivDominoPairs(self, dominoes: List[List[int]]) -> int:
        # Canonical orientation (min, max) collapses a domino and its
        # rotation to one cell of a 9x9 table.
        table = [[0] * 10 for _ in range(10)]
        pairs = 0
        for a, b in dominoes:
            lo, hi = (a, b) if a <= b else (b, a)
            # Every earlier domino in this cell pairs with the current one.
            pairs += table[lo][hi]
            table[lo][hi] += 1
        return pairs
