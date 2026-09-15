from typing import List


class Solution:
    def numberOfSequence(self, n: int, sick: List[int]) -> int:
        # The initially infected people split the line into blocks of
        # uninfected people. An edge block (touching index 0 or n - 1) has
        # only one infectable person per step, so its internal order is
        # forced; an interior block (sick people on both sides) may shed
        # from either endpoint, giving 2^(len - 1) internal orders. Blocks
        # shed independently, so the answer is the multinomial count of
        # ways to interleave the per-step picks across blocks,
        # S! / prod len_i!, times each interior block's 2^(len - 1), all
        # mod 10^9 + 7. S <= n <= 10^5 keeps the factorial tables small;
        # residues multiply past 32 bits but stay exact on Python ints.
        mod = 1_000_000_007
        fact = [1] * (n + 1)
        for i in range(1, n + 1):
            fact[i] = fact[i - 1] * i % mod
        inv_fact = [1] * (n + 1)
        inv_fact[n] = pow(fact[n], mod - 2, mod)
        for i in range(n, 0, -1):
            inv_fact[i - 1] = inv_fact[i] * i % mod
        pow2 = [1] * (n + 1)
        for i in range(1, n + 1):
            pow2[i] = pow2[i - 1] * 2 % mod

        ans = fact[n - len(sick)]
        if sick[0] > 0:
            ans = ans * inv_fact[sick[0]] % mod
        for a, b in zip(sick, sick[1:]):
            gap = b - a - 1
            if gap > 0:
                ans = ans * inv_fact[gap] % mod * pow2[gap - 1] % mod
        if sick[-1] < n - 1:
            ans = ans * inv_fact[n - 1 - sick[-1]] % mod
        return ans
