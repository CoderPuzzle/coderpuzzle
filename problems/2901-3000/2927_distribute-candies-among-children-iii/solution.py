from typing import List, Optional


class Solution:
    def distributeCandies(self, n: int, limit: int) -> int:
        # Inclusion-exclusion on the cap. Unbounded distributions of n
        # candies to 3 children number C(n + 2, 2). A child over the cap has
        # limit + 1 or more, so hand that child limit + 1 candies up front
        # and count the rest: C(n - (limit + 1) + 2, 2) per over-cap child,
        # added back in pairs C(3, 2) * C(n - 2 * (limit + 1) + 2, 2). The
        # triple term never fires: it needs n >= 3 * (limit + 1), which is
        # already past the 3 * limit total capacity, so those inputs are 0.
        if n > 3 * limit:
            return 0
        total = 0
        for k in (0, 1, 2):
            rest = n - k * (limit + 1)
            if rest < 0:
                break
            ways = (rest + 2) * (rest + 1) // 2
            total += (1 if k % 2 == 0 else -1) * (1, 3, 3)[k] * ways
        return total
