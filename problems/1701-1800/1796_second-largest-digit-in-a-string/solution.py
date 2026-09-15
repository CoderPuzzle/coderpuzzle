from typing import List, Optional


class Solution:
    def secondHighest(self, s: str) -> int:
        # One pass tracking the two largest distinct digits seen: first
        # is the maximum, second the runner-up. A digit equal to an
        # already-tracked value changes nothing, which is the
        # distinctness rule; -1 survives when fewer than two distinct
        # digits appear.
        first = -1
        second = -1
        for c in s:
            if "0" <= c <= "9":
                v = int(c)
                if v > first:
                    second = first
                    first = v
                elif second < v < first:
                    second = v
        return second
