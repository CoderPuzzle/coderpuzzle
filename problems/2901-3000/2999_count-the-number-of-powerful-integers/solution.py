from typing import List, Optional
from functools import lru_cache


class Solution:
    def numberOfPowerfulInt(self, start: int, finish: int, limit: int, s: str) -> int:
        def count_exact_len(p, cap, lim):
            # number of integers with exactly p digits, every digit <= lim, <= cap
            if cap < 10 ** (p - 1):
                return 0
            if cap >= 10**p - 1:
                return lim * (lim + 1) ** (p - 1)
            cap_digits = list(map(int, str(cap)))

            @lru_cache(maxsize=None)
            def dp(pos, tight):
                if pos == p:
                    return 1
                up = cap_digits[pos] if tight else 9
                lo = 1 if pos == 0 else 0
                total = 0
                for d in range(lo, min(up, lim) + 1):
                    total += dp(pos + 1, tight and d == up)
                return total

            return dp(0, True)

        def count_powerful(x):
            if x <= 0:
                return 0
            n = len(str(x))
            len_s = len(s)
            if len_s > n:
                return 0
            sv = int(s)
            if x < sv:
                return 0
            cap = (x - sv) // (10**len_s)
            total = 1  # the number s itself (empty prefix)
            for p in range(1, n - len_s + 1):
                total += count_exact_len(p, cap, limit)
            return total

        return count_powerful(finish) - count_powerful(start - 1)
