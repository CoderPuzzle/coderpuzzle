from typing import List


class Solution:
    def productQueries(self, n: int, queries: List[List[int]]) -> List[int]:
        # The minimum set of powers of two summing to n is exactly its set
        # bits (hint 1), so powers is the sorted list of 1 << b for each
        # set bit b. A range product of ascending powers of two is itself
        # a power of two — 2^(exponent sum) — but under the modulus the
        # clean tool is prefix products with one modular inverse per query
        # (Fermat, MOD prime): product(lo..hi) = pref[hi+1] * inv(pref[lo]).
        MOD = 1_000_000_007
        powers = [1 << b for b in range(30) if n >> b & 1]
        pref = [1]
        for v in powers:
            pref.append(pref[-1] * v % MOD)
        return [pref[hi + 1] * pow(pref[lo], MOD - 2, MOD) % MOD for lo, hi in queries]
