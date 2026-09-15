from typing import List, Optional


class Solution:
    def lastInteger(self, n: int) -> int:
        start, step, remaining = 1, 1, n
        from_left = True
        while remaining > 1:
            # A left pass always keeps the first (smallest) element.
            # A right pass keeps the first element only when the count is odd.
            if not from_left and remaining % 2 == 0:
                start += step
            remaining = (remaining + 1) // 2
            step *= 2
            from_left = not from_left
        return start
