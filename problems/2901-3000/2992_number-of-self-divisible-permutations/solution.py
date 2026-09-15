from math import gcd


class Solution:
    def selfDivisiblePermutationCount(self, n: int) -> int:
        # Position i (1-indexed) may receive value v exactly when gcd(v, i)
        # is 1. Precompute that compatibility grid once, then count valid
        # permutations with a subset DP: dp[mask] is the number of ways to
        # fill the first popcount(mask) positions using exactly the values
        # in mask, so extending by the last-placed value v gives
        # dp[mask] = sum over compatible v in mask of dp[mask without v].
        # Even 12! fits comfortably in a machine word, so plain ints are safe.
        compat = [[gcd(v, i) == 1 for v in range(1, n + 1)] for i in range(1, n + 1)]
        full = 1 << n
        dp = [0] * full
        dp[0] = 1
        for mask in range(1, full):
            pos = mask.bit_count()  # 1-indexed position being filled now
            row = compat[pos - 1]
            total = 0
            for v in range(n):
                if (mask >> v) & 1 and row[v]:
                    total += dp[mask ^ (1 << v)]
            dp[mask] = total
        return dp[full - 1]
