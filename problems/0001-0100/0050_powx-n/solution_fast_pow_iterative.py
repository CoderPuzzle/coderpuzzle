from typing import List, Optional


class Solution:
    def myPow(self, x: float, n: int) -> float:
        def power(base: float, exp: int) -> float:
            # Exponentiation by squaring: x^n = (x^2)^(n/2) when n is even
            # and x * (x^2)^((n-1)/2) when odd, so halving the exponent every
            # step turns the linear chain into O(log n) multiplications.
            # Walk exp's bits from least to most significant.
            result = 1.0
            while exp:
                # A set bit folds the current square into the result.
                if exp & 1:
                    result *= base
                base *= base
                exp >>= 1
            # result = product of x^(2^k) over exactly the set bits k of the
            # original exponent; exp == 0 skips the loop and yields 1.0.
            return result

        # By symmetry x^n = 1 / x^(-n); Python ints are arbitrary precision,
        # so negating n = -2^31 cannot overflow.
        if n < 0:
            return 1.0 / power(x, -n)
        return power(x, n)
