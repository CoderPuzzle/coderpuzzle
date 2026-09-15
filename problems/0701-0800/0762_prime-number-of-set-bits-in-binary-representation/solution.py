class Solution:
    def countPrimeSetBits(self, left: int, right: int) -> int:
        # A 0/1 table indexed by set-bit count holds the primality
        # verdict for every count the bound allows: right <= 10^6 fits
        # in twenty bits, so the count is 1..19 and the primes there
        # are 2, 3, 5, 7, 11, 13, 17, 19. Index 1 holds 0 — a lone set
        # bit, the value 1 and every power of two, is not prime — so
        # each candidate costs one popcount plus one table read.
        is_prime = [0] * 21
        for p in (2, 3, 5, 7, 11, 13, 17, 19):
            is_prime[p] = 1
        return sum(is_prime[n.bit_count()] for n in range(left, right + 1))
