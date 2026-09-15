class Solution:
    def getSum(self, a: int, b: int) -> int:
        # XOR is addition without the carries; AND marks every position
        # that produces a carry, and shifting it left one place lines the
        # carries up under the digits they inflate. Repeat until no carry
        # remains. Python ints are arbitrary precision, so every
        # intermediate is masked back to the low 32 bits — the
        # two's-complement width the answer lives in — and the final
        # pattern is sign-extended back into a negative Python int.
        mask = 0xFFFFFFFF
        while b != 0:
            carry = ((a & b) << 1) & mask
            a = (a ^ b) & mask
            b = carry
        return a if a <= 0x7FFFFFFF else ~(a ^ mask)
