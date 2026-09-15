from typing import List, Optional


class Solution:
    def furthestDistanceFromOrigin(self, moves: str) -> int:
        # Only the split between the fixed moves matters: each 'L'
        # steps -1 and each 'R' +1, so together they settle at the
        # offset left - right. Every '_' is free to become either
        # character, and spending all of them on one side dominates
        # any mixed assignment — a mixture only lets some of them
        # cancel out against the rest. The furthest point is
        # therefore |left - right| + wilds, reached by rewriting
        # every '_' as whichever fixed character already leads; ties
        # choose either side at no cost.
        left = right = wilds = 0
        for ch in moves:
            if ch == "L":
                left += 1
            elif ch == "R":
                right += 1
            else:
                wilds += 1
        return abs(left - right) + wilds
