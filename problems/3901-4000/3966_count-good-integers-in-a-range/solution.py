from typing import List, Optional


class Solution:
    def goodIntegers(self, l: int, r: int, k: int) -> int:
        def _count_good(x, k):
            """Number of good integers in [0, x] (x >= 0)."""
            if x < 0:
                return 0
            digits = [int(c) for c in str(x)]
            n = len(digits)

            from functools import lru_cache

            @lru_cache(maxsize=None)
            def dp(pos, tight, prev, started):
                if pos == n:
                    return 1  # 0 and every completed number count as good
                limit = digits[pos] if tight else 9
                total = 0
                for d in range(limit + 1):
                    ntight = tight and (d == limit)
                    if not started and d == 0:
                        total += dp(pos + 1, ntight, 0, False)
                    else:
                        if started and abs(d - prev) > k:
                            continue
                        total += dp(pos + 1, ntight, d, True)
                return total

            return dp(0, True, 0, False)

        return _count_good(r, k) - _count_good(l - 1, k)
