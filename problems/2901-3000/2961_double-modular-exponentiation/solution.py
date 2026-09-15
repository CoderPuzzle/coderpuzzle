from typing import List


class Solution:
    def getGoodIndices(self, variables: List[List[int]], target: int) -> List[int]:
        # Binary exponentiation keeps every intermediate below the modulus
        # squared: last digit of a^b first (mod 10), then that residue raised
        # to c modulo m. m can be 1, so seeds start at 1 % mod, and squaring
        # a residue below 10**3 stays far inside 32 bits.
        def mod_pow(base: int, exp: int, mod: int) -> int:
            result = 1 % mod
            base %= mod
            while exp > 0:
                if exp & 1:
                    result = result * base % mod
                base = base * base % mod
                exp >>= 1
            return result

        return [i for i, (a, b, c, m) in enumerate(variables) if mod_pow(mod_pow(a, b, 10), c, m) == target]
