from typing import List, Optional


class Solution:
    def canChange(self, start: str, target: str) -> bool:
        # pieces cannot pass through each other, so their relative order is
        # invariant: the k-th non-blank of start must match the k-th of target
        s = [(i, c) for i, c in enumerate(start) if c != "_"]
        t = [(i, c) for i, c in enumerate(target) if c != "_"]
        # unequal piece counts can never be matched one-to-one
        if len(s) != len(t):
            return False
        for (i, ci), (j, cj) in zip(s, t):
            # equal counts but a different L/R sequence cannot align
            if ci != cj:
                return False
            # L slides only left: it must not need to move right (i >= j);
            # R slides only right: i <= j — and these checks are also
            # sufficient, so no moves ever need simulating
            if ci == "L" and i < j:
                return False
            if ci == "R" and i > j:
                return False
        return True
