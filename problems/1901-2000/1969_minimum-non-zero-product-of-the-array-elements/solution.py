class Solution:
    def minNonZeroProduct(self, p: int) -> int:
        # Every integer in [1, 2^p - 1] pairs with its bitwise complement
        # 2^p - 1 - x: the two use exactly opposite bits, so swapping can push
        # all the 1s onto one of them and each pair collapses to (1, 2^p - 2)
        # with product 2^p - 2. The unpaired all-ones 2^p - 1 stays untouched
        # (reducing it would force a zero). With 2^(p-1) - 1 pairs the minimum
        # non-zero product is (2^p - 2)^(2^(p-1) - 1) * (2^p - 1), folded by
        # iterative square-and-multiply — p up to 60 costs ~60 squarings.
        MOD = 1_000_000_007
        full = (1 << p) - 1
        base = full - 1
        exp = (1 << (p - 1)) - 1
        result = 1
        b = base % MOD
        while exp > 0:
            if exp & 1:
                result = result * b % MOD
            b = b * b % MOD
            exp >>= 1
        return result * (full % MOD) % MOD
