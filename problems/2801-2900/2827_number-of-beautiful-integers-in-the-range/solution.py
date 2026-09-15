from typing import List, Optional
from functools import lru_cache


class Solution:
    def numberOfBeautifulIntegers(self, low: int, high: int, k: int) -> int:
        # f(n) = beautiful integers in [1, n]; answer is f(high) - f(low-1).
        def count_up_to(n):
            if n <= 0:
                return 0
            digits = list(map(int, str(n)))

            @lru_cache(maxsize=None)
            def dp(pos, tight, started, balance, mod):
                # Digit DP tracking everything the two conditions need:
                # balance (odd digits minus even digits written so far) and
                # the value mod k. Memoization shares all loose subproblems,
                # so the recursion enumerates states, not numbers.
                if pos == len(digits):
                    return 1 if started and balance == 0 and mod == 0 else 0
                # tight: prefix still equals the bound's, capping this digit.
                limit = digits[pos] if tight else 9
                total = 0
                for d in range(limit + 1):
                    next_tight = tight and d == limit
                    # A leading zero writes nothing: it leaves the balance
                    # untouched and does not count as an even digit.
                    if not started and d == 0:
                        total += dp(pos + 1, next_tight, False, balance, (mod * 10 + d) % k)
                    else:
                        new_balance = balance + (1 if d % 2 == 1 else -1)
                        total += dp(pos + 1, next_tight, True, new_balance, (mod * 10 + d) % k)
                return total

            return dp(0, True, False, 0, 0)

        return count_up_to(high) - count_up_to(low - 1)
