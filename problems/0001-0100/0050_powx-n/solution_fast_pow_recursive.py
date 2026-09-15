from typing import List, Optional


class Solution:
    def myPow(self, x: float, n: int) -> float:
        def power(base: float, exp: int) -> float:
            # Exponentiation by halving: compute the square of the half-size
            # subproblem once, then use it once (even exp) or twice (odd) —
            # x^n = (x^(n/2))^2, times x when exp is odd.
            if exp == 0:
                # Base case: any nonzero base to the zero is 1.0.
                return 1.0
            half = power(base, exp // 2)
            if exp % 2 == 0:
                return half * half
            # One leftover factor of x for the odd exponent.
            return half * half * base

        # By symmetry x^n = 1 / x^(-n); Python ints are arbitrary precision,
        # so negating n = -2^31 cannot overflow.
        if n < 0:
            return 1.0 / power(x, -n)
        return power(x, n)
