from typing import List, Optional


class Solution:
    def countKReducibleNumbers(self, s: str, k: int) -> int:
        MOD = 10**9 + 7
        L = len(s)
        # f[x] = number of operations to reduce x to 1.
        f = [0] * (L + 1)
        for x in range(2, L + 1):
            f[x] = 1 + f[bin(x).count("1")]
        # Pascal's triangle mod MOD.
        C = [[0] * (L + 1) for _ in range(L + 1)]
        for i in range(L + 1):
            C[i][0] = 1
            for j in range(1, i + 1):
                C[i][j] = (C[i - 1][j - 1] + C[i - 1][j]) % MOD
        # cnt[p] = number of integers x in [0, n-1] with popcount(x) == p.
        cnt = [0] * (L + 1)
        ones = 0
        for i, ch in enumerate(s):
            if ch == "1":
                remaining = L - i - 1
                for p in range(remaining + 1):
                    cnt[ones + p] = (cnt[ones + p] + C[remaining][p]) % MOD
                ones += 1
        ans = 0
        for p in range(1, L + 1):
            if 1 + f[p] <= k:
                ans = (ans + cnt[p]) % MOD
        return ans
