from typing import List, Optional

MOD = 1_000_000_007
_MAX = 20000


def _build_factorials(max_n):
    fact = [1] * (max_n + 1)
    for i in range(1, max_n + 1):
        fact[i] = fact[i - 1] * i % MOD
    inv_fact = [1] * (max_n + 1)
    # One Fermat inversion at the top; running it backwards yields every
    # smaller inverse factorial with a single multiplication each.
    inv_fact[max_n] = pow(fact[max_n], MOD - 2, MOD)
    for i in range(max_n, 0, -1):
        inv_fact[i - 1] = inv_fact[i] * i % MOD
    return fact, inv_fact


_FACT, _INV_FACT = _build_factorials(_MAX)


def _comb(n, r):
    if r < 0 or r > n:
        return 0
    return _FACT[n] * _INV_FACT[r] % MOD * _INV_FACT[n - r] % MOD


def _prime_exponents(k):
    # Trial division up to sqrt(k) collects each prime's exponent.
    exponents = []
    d = 2
    while d * d <= k:
        if k % d == 0:
            count = 0
            while k % d == 0:
                k //= d
                count += 1
            exponents.append(count)
        d += 1
    # A leftover greater than 1 is a prime of exponent 1.
    if k > 1:
        exponents.append(1)
    return exponents


class Solution:
    def waysToFillArray(self, queries: List[List[int]]) -> List[int]:
        answers = []
        for n, k in queries:
            ways = 1
            # Primes never interact, so the per-prime counts multiply:
            # spreading x copies of one prime over n slots is stars and
            # bars, C(x + n - 1, n - 1).
            for exponent in _prime_exponents(k):
                ways = ways * _comb(exponent + n - 1, n - 1) % MOD
            answers.append(ways)
        return answers
