import math


class Solution:
    def nonSpecialCount(self, l: int, r: int) -> int:
        # A number is special exactly when it is the square of a prime:
        # p*p has precisely the proper divisors 1 and p, any other number
        # has more than two (three divisors total forces the form
        # prime^2), and 1 itself has none. The specials in [l, r] are
        # therefore the squares of primes in [ceil(sqrt(l)),
        # floor(sqrt(r))] — at most sqrt(10^9) ~ 31623 candidates,
        # counted with one sieve. math.isqrt is exact integer arithmetic,
        # so rounding can never move a boundary.
        hi = math.isqrt(r)
        lo = math.isqrt(l - 1) + 1  # smallest s with s*s >= l
        composite = bytearray(hi + 1)  # 0 = prime candidate, 1 = composite
        for p in range(2, hi + 1):
            if p * p > hi:
                break
            if not composite[p]:
                composite[p * p :: p] = b"\x01" * (hi // p - p + 1)
        specials = sum(1 for p in range(max(lo, 2), hi + 1) if not composite[p])
        return (r - l + 1) - specials
