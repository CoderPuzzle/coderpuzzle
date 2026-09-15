from typing import List, Optional


class Solution:
    def minimumCost(self, s: str, t: str, flipCost: int, swapCost: int, crossCost: int) -> int:
        # Mismatch classes decide everything: a01 counts columns needing 0->1,
        # a10 the mirror image. Opposite kinds cancel pairwise with one swap
        # (or two flips); leftovers of a single kind pair up via cross-swap +
        # swap (or two flips); a lone leftover takes one flip.
        a01 = 0
        a10 = 0
        for x, y in zip(s, t):
            if x == "0" and y == "1":
                a01 += 1
            elif x == "1" and y == "0":
                a10 += 1
        # Opposite-kind mismatches fix each other: reorder one string so they
        # meet, paying one swap; two flips is the alternative.
        pairs = min(a01, a10)
        cost = pairs * min(swapCost, 2 * flipCost)
        same = abs(a01 - a10)
        # Same-kind mismatches: a cross-swap turns one into the other kind,
        # then a swap pairs it — or just flip both.
        cost += (same // 2) * min(crossCost + swapCost, 2 * flipCost)
        if same % 2 == 1:
            cost += flipCost
        return cost
