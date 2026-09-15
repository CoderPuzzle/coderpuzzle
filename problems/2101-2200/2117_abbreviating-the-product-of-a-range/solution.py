import math
from typing import List, Optional


class Solution:
    def abbreviateProduct(self, left: int, right: int) -> str:
        modulus = 10_000_000_000
        logarithm = 0.0
        twos = 0
        fives = 0
        suffix = 1

        for value in range(left, right + 1):
            logarithm += math.log10(value)
            remaining = value
            while remaining % 2 == 0:
                twos += 1
                remaining //= 2
            while remaining % 5 == 0:
                fives += 1
                remaining //= 5
            suffix = suffix * remaining % modulus

        zeros = min(twos, fives)
        for _ in range(twos - zeros):
            suffix = suffix * 2 % modulus
        for _ in range(fives - zeros):
            suffix = suffix * 5 % modulus

        adjusted_logarithm = logarithm - zeros
        digits = math.floor(adjusted_logarithm) + 1
        if digits <= 10:
            return f"{suffix}e{zeros}"

        fractional = adjusted_logarithm - math.floor(adjusted_logarithm)
        prefix = math.floor(10 ** (fractional + 4))
        return f"{prefix}...{suffix % 100_000:05d}e{zeros}"
