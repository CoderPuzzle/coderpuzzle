from typing import List, Optional


class Solution:
    def countPrimes(self, n: int) -> int:
        # No primes strictly below 2.
        if n < 3:
            return 0
        # Sieve of Eratosthenes: assume everything prime, then cross off each
        # prime's multiples in one stroke.
        is_prime = bytearray([1]) * n
        is_prime[0] = is_prime[1] = 0
        i = 2
        # Any composite below n has a factor <= its square root, so nothing
        # new gets marked beyond this bound.
        while i * i < n:
            if is_prime[i]:
                # Zero the multiples of i in one C-level slice assignment,
                # starting at i*i — smaller multiples were crossed off by
                # their smaller factors.
                is_prime[i * i :: i] = bytearray(len(range(i * i, n, i)))
            i += 1
        # Survivors were never a multiple of anything smaller: they are prime.
        return sum(is_prime)
