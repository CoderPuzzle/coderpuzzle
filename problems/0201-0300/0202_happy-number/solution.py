from typing import List, Optional


class Solution:
    def isHappy(self, n: int) -> bool:
        # Sum of the squares of the digits, one digit per iteration.
        def step(m: int) -> int:
            total = 0
            while m:
                m, digit = divmod(m, 10)
                total += digit * digit
            return total

        # The digit-square map is deterministic, so iterating it must reach 1
        # (a fixed point) or cycle; a revisit means it will never reach 1.
        seen = set()
        while n != 1 and n not in seen:
            seen.add(n)
            n = step(n)
        return n == 1
