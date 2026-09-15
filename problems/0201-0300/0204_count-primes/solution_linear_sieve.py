from typing import List, Optional


class Solution:
    def countPrimes(self, n: int) -> int:
        # No primes strictly below 2.
        if n < 3:
            return 0
        # spf[x] = the smallest prime factor of x (0 while x is untouched);
        # the primes found so far collect in ascending order.
        spf = [0] * n
        primes = []
        for i in range(2, n):
            if spf[i] == 0:
                # Nothing smaller ever marked i, so i is prime (and its own
                # smallest prime factor).
                primes.append(i)
                spf[i] = i
            # Mark i*p composite for every prime p up to spf[i]: each
            # composite gets written exactly once, by its smallest factor.
            limit = spf[i]
            for p in primes:
                if p > limit or i * p >= n:
                    break
                spf[i * p] = p
        return len(primes)
