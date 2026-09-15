import math
from typing import List, Optional


class Solution:
    def countTriples(self, n: int) -> int:
        # Each ordered pair (a, b) contributes one triple iff a^2 + b^2 is a
        # perfect square c^2 with c <= n. Rounding sqrt and re-squaring keeps
        # the check on the integer side, immune to float drift.
        count = 0
        for a in range(1, n + 1):
            for b in range(1, n + 1):
                s = a * a + b * b
                r = math.isqrt(s)
                if r <= n and r * r == s:
                    count += 1
        return count
