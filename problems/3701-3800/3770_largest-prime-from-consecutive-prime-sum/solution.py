class Solution:
    def largestPrime(self, n: int) -> int:
        # Sieve once: it answers primality for every prime and for every
        # running total the scan below produces.
        sieve = bytearray([1]) * (n + 1)
        sieve[0] = 0
        if n >= 1:
            sieve[1] = 0
        i = 2
        while i * i <= n:
            if sieve[i]:
                sieve[i * i :: i] = bytearray(len(range(i * i, n + 1, i)))
            i += 1
        # Prefix sums of the prime sequence are exactly the consecutive
        # prime sums starting from 2; totals only grow, so the last prime
        # one seen before the total exceeds n is the largest. Totals stay
        # far below 2^63, but Python ints make that a non-issue.
        total = 0
        best = 0
        for p in range(2, n + 1):
            if not sieve[p]:
                continue
            total += p
            if total > n:
                break
            if sieve[total]:
                best = total
        return best
