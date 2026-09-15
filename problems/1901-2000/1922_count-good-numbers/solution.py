class Solution:
    def countGoodNumbers(self, n: int) -> int:
        MOD = 1_000_000_007

        # Positions split by parity: (n+1)//2 even indices each hold one of
        # the 5 even digits, n//2 odd indices one of the 4 prime digits. The
        # product 5^e * 4^o is folded by iterative square-and-multiply, so n
        # up to 10^15 costs ~50 modular multiplications.
        def power(base: int, exp: int) -> int:
            result = 1
            b = base % MOD
            while exp:
                if exp & 1:
                    result = result * b % MOD
                b = b * b % MOD
                exp >>= 1
            return result

        return power(5, (n + 1) // 2) * power(4, n // 2) % MOD
