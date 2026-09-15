from typing import List, Optional


class Solution:
    def countOrders(self, n: int) -> int:
        MOD = 10**9 + 7
        result = 1
        # f(i) = f(i-1) * i * (2i-1): the 2(i-1) placed services leave
        # 2i-1 gaps; pickup picks one, delivery lands to its right (1+2+...+(2i-1))
        for i in range(2, n + 1):
            result = result * (2 * i - 1) * i % MOD
        return result
