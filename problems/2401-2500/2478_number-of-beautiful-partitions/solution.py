from typing import List, Optional


class Solution:
    def beautifulPartitions(self, s: str, k: int, minLength: int) -> int:
        MOD = 10**9 + 7
        primes = set("2357")

        def is_prime(ch):
            return ch in primes

        n = len(s)
        # dp[i][j] = number of ways to partition s[0:i] into j beautiful substrings
        dp = [[0] * (k + 1) for _ in range(n + 1)]
        dp[0][0] = 1
        for j in range(1, k + 1):
            # prefix[l] = sum_{x=0}^{l-1} dp[x][j-1] where s[x] is a prime digit
            prefix = [0] * (n + 1)
            for x in range(n):
                prefix[x + 1] = prefix[x]
                if is_prime(s[x]):
                    prefix[x + 1] += dp[x][j - 1]
            for i in range(1, n + 1):
                if is_prime(s[i - 1]):
                    continue  # substring must end on a non-prime digit
                hi = i - minLength
                if hi >= 0:
                    dp[i][j] = prefix[hi + 1] % MOD
        return dp[n][k] % MOD
