from typing import List, Optional


class Solution:
    def distanceSum(self, m: int, n: int, k: int) -> int:
        # Fix an unordered pair of cells: both carry a piece in exactly
        # C(m*n - 2, k - 2) arrangements (place the remaining k - 2 pieces
        # anywhere else), so the answer is (pairwise distance sum over all
        # cell pairs) * C(m*n - 2, k - 2) mod 10^9 + 7. By axis separation,
        # rows d apart pair with n columns on each side, so the board sum is
        # n^2 * T(m) + m^2 * T(n) with T(M) = M * (M - 1) * (M + 1) / 6 --
        # three consecutive integers, so the division is exact. M <= 10^5
        # keeps M^3 <= 10^15 and the factorial table within m * n <= 10^5
        # entries; Python integers are exact throughout.
        mod = 1_000_000_007
        total = m * n

        fact = [1] * (total + 1)
        for i in range(1, total + 1):
            fact[i] = fact[i - 1] * i % mod
        inv_fact = [1] * (total + 1)
        inv_fact[total] = pow(fact[total], mod - 2, mod)
        for i in range(total, 0, -1):
            inv_fact[i - 1] = inv_fact[i] * i % mod

        def tri(dim: int) -> int:
            return dim * (dim - 1) * (dim + 1) // 6 % mod

        pairs = (n * n % mod * tri(m) + m * m % mod * tri(n)) % mod
        choose = fact[total - 2] * inv_fact[k - 2] % mod * inv_fact[total - k] % mod
        return pairs * choose % mod
