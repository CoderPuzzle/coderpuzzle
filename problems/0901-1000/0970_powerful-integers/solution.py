from typing import List, Optional


class Solution:
    def powerfulIntegers(self, x: int, y: int, bound: int) -> List[int]:
        # Walk the x-ladder 1, x, x^2, ... while x^i <= bound. Every
        # y-power is at least 1, so once x^i exceeds bound no sum it
        # heads can stay legal and the walk may stop there.
        seen = set()
        xi = 1
        while xi <= bound:
            # For this x-power, walk the y-ladder while the sum stays
            # within bound. A base of 1 freezes its ladder at 1 — cap
            # the exponent right there, or the walk never advances.
            yj = 1
            while xi + yj <= bound:
                seen.add(xi + yj)
                if y == 1:
                    break
                yj *= y
            # The same cap on the x-ladder itself.
            if x == 1:
                break
            xi *= x
        # The set already holds every distinct legal sum; sorting
        # states the pinned ascending order in code.
        return sorted(seen)
