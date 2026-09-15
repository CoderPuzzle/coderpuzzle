import math
from typing import List, Optional


class Solution:
    def closestPrimes(self, left: int, right: int) -> List[int]:
        # Per-number trial division judges each candidate in [left, right]
        # on its own: 2 and 3 fall to a single modulo each, and every
        # remaining prime divisor is a neighbor of a multiple of six, so
        # the test tries d and d + 2 while stepping d by six, stopping
        # once d * d passes n. One ascending scan then keeps only the
        # previous prime seen, replacing on strict improvement to keep
        # the earliest p among ties.

        def is_prime(n: int) -> bool:
            if n < 2:
                return False
            if n < 4:
                return True
            if n % 2 == 0 or n % 3 == 0:
                return False
            limit = math.isqrt(n)
            d = 5
            while d <= limit:
                if n % d == 0 or n % (d + 2) == 0:
                    return False
                d += 6
            return True

        best_pair = [-1, -1]
        previous = -1
        for n in range(left, right + 1):
            if not is_prime(n):
                continue
            if previous != -1 and (best_pair[0] == -1 or n - previous < best_pair[1] - best_pair[0]):
                best_pair = [previous, n]
            previous = n
        return best_pair
