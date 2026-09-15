from typing import List, Optional


class Solution:
    def closestPrimes(self, left: int, right: int) -> List[int]:
        # Sieve of Eratosthenes up to right marks every prime once; one
        # ascending pass over [left, right] then walks only consecutive
        # primes, since a larger gap spanning a skipped prime can never
        # beat the adjacent gaps inside it. Replacing on strict
        # improvement keeps the earliest num1 among ties.
        sieve = bytearray([1]) * (right + 1)
        sieve[0] = 0
        if right >= 1:
            sieve[1] = 0
        f = 2
        while f * f <= right:
            if sieve[f]:
                start = f * f
                sieve[start::f] = bytearray((right - start) // f + 1)
            f += 1
        best_pair = [-1, -1]
        previous = -1
        for n in range(left, right + 1):
            if not sieve[n]:
                continue
            if previous != -1 and (best_pair[0] == -1 or n - previous < best_pair[1] - best_pair[0]):
                best_pair = [previous, n]
            previous = n
        return best_pair
