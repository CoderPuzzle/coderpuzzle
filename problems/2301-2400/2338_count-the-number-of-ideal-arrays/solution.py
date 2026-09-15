from typing import List, Optional


class Solution:
    def idealArrays(self, n: int, maxValue: int) -> int:
        MOD = 10**9 + 7
        # dp[v] = number of chains of the current length ending at value v
        dp = [0] + [1] * maxValue
        comb = 1  # C(n-1, 0)
        ans = 0
        for chain_len in range(1, n + 1):
            total = sum(dp) % MOD
            ans = (ans + total * comb) % MOD
            if chain_len == n:
                break
            # C(n-1, chain_len) = C(n-1, chain_len-1) * (n - chain_len) / chain_len
            comb = comb * (n - chain_len) % MOD * pow(chain_len, MOD - 2, MOD) % MOD
            ndp = [0] * (maxValue + 1)
            for v in range(1, maxValue + 1):
                cv = dp[v]
                if cv == 0:
                    continue
                m = v + v
                while m <= maxValue:
                    ndp[m] = (ndp[m] + cv) % MOD
                    m += v
            dp = ndp
            if sum(dp) == 0:
                break
        return ans % MOD
