from typing import List


class Solution:
    def countValidSequences(self, n: int, k: int) -> int:
        MOD = 10**9 + 7
        # Factorials and inverse factorials up to n; the single modular
        # inverse comes from Fermat's little theorem (p prime), no floats.
        fact = [1] * (n + 1)
        for i in range(1, n + 1):
            fact[i] = fact[i - 1] * i % MOD
        inv_fact = [1] * (n + 1)
        inv_fact[n] = pow(fact[n], MOD - 2, MOD)
        for i in range(n, 0, -1):
            inv_fact[i - 1] = inv_fact[i] * i % MOD

        def comb(a: int, b: int) -> int:
            if b < 0 or b > a:
                return 0
            return fact[a] * inv_fact[b] % MOD * inv_fact[a - b] % MOD

        total = comb(n - 1, k - 1)
        # All-odd compositions exist iff n - k is even; substituting each
        # part x_i = 2*y_i + 1 leaves (n-k)/2 spread over k non-negative y_i.
        if (n - k) % 2 == 0:
            total -= comb((n + k) // 2 - 1, k - 1)
        return total % MOD
