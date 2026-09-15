from typing import List, Optional


class Solution:
    def maximumNumber(self, num: str, change: List[int]) -> str:
        # Greedy: the leftmost digit change strictly improves is where the
        # mutation must start -- an earlier digit is more significant, so
        # improving it dominates any later start. Extend through every
        # non-hurting digit (change[d] >= d) and stop at the first hurting
        # one, since the mutated substring must stay contiguous.
        digits = list(num)
        started = False
        for index, character in enumerate(num):
            d = ord(character) - 48
            if change[d] > d:
                started = True
                digits[index] = str(change[d])
            elif change[d] < d and started:
                break
        return "".join(digits)
