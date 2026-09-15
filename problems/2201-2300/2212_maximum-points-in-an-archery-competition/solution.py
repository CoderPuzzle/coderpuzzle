from typing import List


class Solution:
    def maximumBobPoints(self, numArrows: int, aliceArrows: List[int]) -> List[int]:
        # Winning section k costs aliceArrows[k] + 1 arrows and pays k points,
        # so with only 12 sections every affordable winning set can be swept.
        best_points = 0
        best_mask = 0
        for mask in range(1, 1 << 12):
            cost = 0
            points = 0
            for k in range(12):
                if mask >> k & 1:
                    cost += aliceArrows[k] + 1
                    points += k
            # Strict improvement keeps the smallest mask on ties, which pins
            # one deterministic answer among equally scoring allocations.
            if cost <= numArrows and points > best_points:
                best_points = points
                best_mask = mask
        bob = [0] * 12
        for k in range(1, 12):
            if best_mask >> k & 1:
                bob[k] = aliceArrows[k] + 1
        # Section 0 scores nothing, so every unspent arrow lands there.
        bob[0] = numArrows - sum(bob)
        return bob
