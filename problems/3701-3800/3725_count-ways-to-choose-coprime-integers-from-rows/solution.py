from typing import List

MOD = 10**9 + 7


class Solution:
    def countCoprime(self, mat: List[List[int]]) -> int:
        # f[d] counts selections whose picks are ALL divisible by d; rows
        # constrain picks independently, so it factors into a product of
        # per-row multiple-counts. Mobius inversion turns those f(d) into
        # the exact gcd-1 count: answer = sum(mu(d) * f(d)).
        top = max(v for row in mat for v in row)
        # mu[j] via the identity "sum of mu over the divisors of j is 1
        # exactly for j == 1": seed mu[1] and subtract down the multiples.
        mu = [0] * (top + 1)
        mu[1] = 1
        for i in range(1, top + 1):
            for j in range(2 * i, top + 1, i):
                mu[j] -= mu[i]
        f = [1] * (top + 1)
        freq = [0] * (top + 1)
        for row in mat:
            for v in row:
                freq[v] += 1
            for d in range(1, top + 1):
                f[d] = f[d] * sum(freq[d::d]) % MOD
            for v in row:
                freq[v] -= 1
        return sum(mu[d] * f[d] for d in range(top + 1)) % MOD
