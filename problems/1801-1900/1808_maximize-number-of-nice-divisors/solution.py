from typing import List, Optional


class Solution:
    def maxNiceDivisors(self, primeFactors: int) -> int:
        # A nice divisor carries at least one copy of every prime of n, so
        # for n = p^a * q^b * ... the nice divisors number a * b * ...: the
        # answer is the largest product of positive integers summing to at
        # most primeFactors, and a part of size 1 never changes a product,
        # so the budget is spent exactly. Break rule: a part x > 4 splits
        # into floor(x/2) + ceil(x/2) with a larger product, and three 2s
        # lose to two 3s, so only 3s and at most two 2s remain -- n <= 4
        # answers n itself; n % 3 == 0 -> 3^(n/3); n % 3 == 1 -> 4 *
        # 3^((n-4)/3), where 2 + 2 beats 3 + 1; n % 3 == 2 -> 2 * 3^(n/3).
        # The exponent reaches 10^9 / 3, so the power runs as an iterative
        # square-and-multiply over residues mod 10^9 + 7; Python integers
        # are exact throughout.
        mod = 1_000_000_007
        n = primeFactors
        if n <= 4:
            return n
        if n % 3 == 0:
            residue, power = 1, n // 3
        elif n % 3 == 1:
            residue, power = 4, (n - 4) // 3
        else:
            residue, power = 2, n // 3
        result = residue
        base = 3
        while power > 0:
            if power & 1:
                result = result * base % mod
            base = base * base % mod
            power >>= 1
        return result
