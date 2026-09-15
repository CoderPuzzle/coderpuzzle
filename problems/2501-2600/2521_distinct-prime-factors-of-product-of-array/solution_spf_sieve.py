from typing import List


class Solution:
    def distinctPrimeFactors(self, nums: List[int]) -> int:
        # The prime-support pin is the same; the factor source changes.
        # One sieve pass records the smallest prime factor of every value
        # up to max(nums), and each element then falls apart by repeated
        # division: the next piece of the remaining quotient is always a
        # table lookup, never a candidate search. Peeling each prime out
        # completely keeps the walk on sieve entries; values are <= 1000,
        # so an element holds at most 9 prime pieces (2^10 overshoots).
        limit = max(nums)
        spf = list(range(limit + 1))
        i = 2
        while i * i <= limit:
            if spf[i] == i:
                for j in range(i * i, limit + 1, i):
                    if spf[j] == j:
                        spf[j] = i
            i += 1
        primes = set()
        for value in nums:
            rest = value
            while rest > 1:
                p = spf[rest]
                primes.add(p)
                while rest % p == 0:
                    rest //= p
        return len(primes)
