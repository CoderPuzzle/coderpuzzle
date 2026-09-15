from typing import List


class Solution:
    def maxWeight(self, weights: List[int], w1: int, w2: int) -> int:
        # Row a is one wide integer whose bit j marks state (a, j) as
        # reachable: bag 1 filled to exactly a, bag 2 to exactly j.
        mask = (1 << (w2 + 1)) - 1
        rows = [0] * (w1 + 1)
        rows[0] = 1
        for w in weights:
            # Bag-2 placements shift a whole row left, trimmed to the legal
            # occupancies. Stage them before the bag-1 pass below touches
            # rows, so both moves read the previous item's states only.
            shifted = [(row << w) & mask for row in rows]
            # Bag-1 placements OR row a - w into row a, walked downward so
            # the merge reads pre-item rows and no item is spent twice.
            for a in range(w1, w - 1, -1):
                rows[a] |= rows[a - w]
            for a in range(w1 + 1):
                rows[a] |= shifted[a]
        best = 0
        for a in range(w1 + 1):
            if rows[a]:
                # Fixed a: the best partner is the highest reachable bit.
                best = max(best, a + rows[a].bit_length() - 1)
        return best
