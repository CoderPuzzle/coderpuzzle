class Solution:
    def countGoodSubsequences(self, s: str) -> int:
        # A good subsequence is generated exactly once by its shared
        # frequency m: each letter either sits out or contributes
        # C(count, m) index choices, so every per-m product counts one
        # term of the answer - plus the all-absent pick that surfaces in
        # every product and is dropped once per term. Binomials come from
        # factorial tables divided through Fermat inverses.
        mod = 10**9 + 7
        counts = [0] * 26
        for ch in s:
            counts[ord(ch) - ord("a")] += 1
        top = max(counts)
        fact = [1] * (top + 1)
        for i in range(2, top + 1):
            fact[i] = fact[i - 1] * i % mod
        inv_fact = [1] * (top + 1)
        inv_fact[top] = pow(fact[top], mod - 2, mod)
        for i in range(top, 0, -1):
            inv_fact[i - 1] = inv_fact[i] * i % mod

        def comb(n, k):
            if k > n:
                return 0
            return fact[n] * inv_fact[k] % mod * inv_fact[n - k] % mod

        present = [c for c in counts if c > 0]
        total = 0
        for m in range(1, top + 1):
            prod = 1
            for count in present:
                prod = prod * (comb(count, m) + 1) % mod
            total += prod - 1
        return total % mod
