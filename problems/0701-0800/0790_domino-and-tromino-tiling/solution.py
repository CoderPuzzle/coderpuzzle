from typing import List, Optional


class Solution:
    def numTilings(self, n: int) -> int:
        MOD = 10**9 + 7
        if n == 1:
            return 1
        if n == 2:
            return 2
        a, b, c = 1, 1, 2  # f(0), f(1), f(2)
        for _ in range(3, n + 1):
            a, b, c = b, c, (2 * c + a) % MOD
        return c
