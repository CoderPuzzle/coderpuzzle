from typing import List
from functools import lru_cache


class Solution:
    def earliestAndLatest(self, n: int, firstPlayer: int, secondPlayer: int) -> List[int]:
        # State: ranks i, j of the two stars in a row of m survivors.
        @lru_cache(maxsize=None)
        def dp(i: int, j: int, m: int):
            if i + j == m + 1:
                return (1, 1)
            if i > m - j + 1:
                return dp(m - j + 1, m - i + 1, m)
            half = (m + 1) // 2
            free = [
                (k, m + 1 - k)
                for k in range(1, half + 1)
                if k < m + 1 - k and i not in (k, m + 1 - k) and j not in (k, m + 1 - k)
            ]
            lo, hi = n, 0
            for mask in range(1 << len(free)):
                survivors = []
                for k in range(1, half + 1):
                    back = m + 1 - k
                    if k == back:
                        survivors.append(k)
                    elif i in (k, back):
                        survivors.append(i)
                    elif j in (k, back):
                        survivors.append(j)
                    else:
                        idx = free.index((k, back))
                        survivors.append(k if mask >> idx & 1 else back)
                survivors.sort()
                sub_lo, sub_hi = dp(survivors.index(i) + 1, survivors.index(j) + 1, len(survivors))
                lo = min(lo, sub_lo)
                hi = max(hi, sub_hi)
            return (lo + 1, hi + 1)

        e, l = dp(firstPlayer, secondPlayer, n)
        return [e, l]
