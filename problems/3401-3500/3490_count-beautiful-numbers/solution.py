from typing import List, Optional
from functools import lru_cache


class Solution:
    def beautifulNumbers(self, l: int, r: int) -> int:
        # Beautiful in [l, r] = count up to r minus count up to l - 1.
        return self._count(r) - self._count(l - 1)

    def _count(self, x):
        if x <= 0:
            return 0
        digits = [int(c) for c in str(x)]

        # Memo is scoped per bound: tight transitions depend on x's digits.
        @lru_cache(maxsize=None)
        # State: position, tight (prefix equals x's), started (nonzero seen),
        # running digit sum and digit product — all that beauty depends on.
        def dp(pos, tight, started, ssum, prod):
            if pos == len(digits):
                # Beautiful iff a number was built and prod is a multiple of the sum;
                # a 0 digit zeroes prod, and 0 is divisible by any positive sum.
                return 1 if started and ssum > 0 and prod % ssum == 0 else 0
            # A tight prefix is capped at x's digit; free prefixes may take any digit.
            limit = digits[pos] if tight else 9
            res = 0
            for d in range(limit + 1):
                nt = tight and (d == limit)
                # Leading zeros contaminate neither the sum nor the product.
                if not started and d == 0:
                    res += dp(pos + 1, nt, False, 0, 1)
                else:
                    res += dp(pos + 1, nt, True, ssum + d, prod * d)
            return res

        return dp(0, True, False, 0, 1)
