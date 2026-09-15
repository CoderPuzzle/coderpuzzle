from typing import List, Optional


class Solution:
    def countVisiblePeople(self, n: int, pos: int, k: int) -> int:
        # The number seen is (# left people choosing 'L') + (# right people
        # choosing 'R'), so Vandermonde's identity collapses the split sum
        # to 2 * C(n - 1, k): factorials up to n - 1 answer that binomial.
        MOD = 10**9 + 7
        if k > n - 1:
            return 0
        size = n - 1
        fact = [1] * (size + 1)
        for i in range(1, size + 1):
            fact[i] = fact[i - 1] * i % MOD
        inv_fact = [1] * (size + 1)
        inv_fact[size] = pow(fact[size], MOD - 2, MOD)
        for i in range(size, 0, -1):
            inv_fact[i - 1] = inv_fact[i] * i % MOD

        def comb(a: int, b: int) -> int:
            if b < 0 or b > a:
                return 0
            return fact[a] * inv_fact[b] % MOD * inv_fact[a - b] % MOD

        return 2 * comb(n - 1, k) % MOD
