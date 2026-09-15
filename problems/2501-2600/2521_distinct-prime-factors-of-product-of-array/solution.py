from typing import List


class Solution:
    def distinctPrimeFactors(self, nums: List[int]) -> int:
        # The product never gets built (per the hint, it is astronomically
        # large): a prime divides the product exactly when it divides some
        # single element. Factor each element by trial division, peeling
        # every copy of a found factor so only primes escape the loop;
        # values are <= 1000, so candidates stay <= 31 once squared.
        primes = set()
        for value in nums:
            rest = value
            d = 2
            while d * d <= rest:
                if rest % d == 0:
                    primes.add(d)
                    while rest % d == 0:
                        rest //= d
                d += 1
            if rest > 1:
                primes.add(rest)
        return len(primes)
