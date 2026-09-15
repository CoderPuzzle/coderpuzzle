from typing import List, Optional


class Solution:
    def rearrangeSticks(self, n: int, k: int) -> int:
        MOD = 10**9 + 7
        # cur[j] = f(i, j): i sticks, j visible
        cur = [0] * (k + 1)
        cur[0] = 1  # f(0, 0)
        for i in range(1, n + 1):
            nxt = [0] * (k + 1)
            for j in range(1, k + 1):
                nxt[j] = (cur[j - 1] + (i - 1) * cur[j]) % MOD
            cur = nxt
        return cur[k]
