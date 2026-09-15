class Solution:
    def sumOfNumbers(self, l: int, r: int, k: int) -> int:
        MOD = 10**9 + 7
        m = r - l + 1
        digit_sum = (l + r) * m // 2
        # A fixed position holds any one digit d of [l, r] in exactly
        # m^(k-1) of the m^k strings, so it contributes digit_sum *
        # m^(k-1) * 10^p; the place weights sum to the repunit
        # R(k) = (10^k - 1) / 9, reduced through Fermat's inverse of 9.
        inv9 = pow(9, MOD - 2, MOD)
        repunit = (pow(10, k, MOD) - 1) * inv9 % MOD
        return digit_sum % MOD * pow(m, k - 1, MOD) % MOD * repunit % MOD
