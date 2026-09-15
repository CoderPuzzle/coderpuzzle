from typing import List


class Solution:
    def countBalancedPermutations(self, num: str) -> int:
        # A balanced permutation is decided by how many copies of each
        # digit land on even indices: a_d of the cnt[d] copies, with
        # sum(a_d) = ceil(n/2) and sum(d * a_d) = total / 2 (the
        # odd-index sum is then implied by the total), each choice
        # contributing C(cnt[d], a_d). A bottom-up DP over digits with
        # states (even slots used, even-index sum) accumulates those
        # binomial products. Arranging the two chosen multisets over the
        # even and odd slots multiplies by even_count! * odd_count! /
        # cnt[d]!, folded in via one modular inverse at the end. All
        # arithmetic is modulo 1e9 + 7, iterative — no recursion.
        MOD = 1_000_000_007
        n = len(num)
        cnt = [0] * 10
        for ch in num:
            cnt[ord(ch) - 48] += 1
        total = sum(d * c for d, c in enumerate(cnt))
        if total % 2:
            return 0
        even_count = (n + 1) // 2
        half = total // 2
        binom = [[0] * (n + 1) for _ in range(n + 1)]
        for i in range(n + 1):
            binom[i][0] = 1
            for j in range(1, i + 1):
                binom[i][j] = (binom[i - 1][j - 1] + binom[i - 1][j]) % MOD
        dp = [[0] * (half + 1) for _ in range(even_count + 1)]
        dp[0][0] = 1
        for d in range(10):
            c = cnt[d]
            if c == 0:
                continue
            ndp = [[0] * (half + 1) for _ in range(even_count + 1)]
            for k in range(even_count + 1):
                for s in range(half + 1):
                    v = dp[k][s]
                    if v == 0:
                        continue
                    for j in range(c + 1):
                        if k + j <= even_count and s + d * j <= half:
                            ndp[k + j][s + d * j] = (ndp[k + j][s + d * j] + v * binom[c][j]) % MOD
            dp = ndp
        fact = [1] * (n + 1)
        for i in range(2, n + 1):
            fact[i] = fact[i - 1] * i % MOD
        slot_ways = fact[even_count] * fact[n - even_count] % MOD
        denom = 1
        for c in cnt:
            denom = denom * fact[c] % MOD
        return dp[even_count][half] * slot_ways % MOD * pow(denom, MOD - 2, MOD) % MOD
