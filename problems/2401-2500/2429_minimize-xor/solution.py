from typing import List


class Solution:
    def minimizeXor(self, num1: int, num2: int) -> int:
        # x must carry exactly popcount(num2) set bits and differ from
        # num1 as little as possible. A bit kept from num1 contributes 0
        # to the xor, so spend the budget first on num1's highest set
        # bits (they dominate the value), then set the lowest zero bits
        # with whatever budget remains.
        budget = num2.bit_count()
        x = 0
        for i in range(31, -1, -1):
            bit = num1 & (1 << i)
            if bit and budget:
                x |= bit
                budget -= 1
        for i in range(32):
            if budget == 0:
                break
            if not x & (1 << i):
                x |= 1 << i
                budget -= 1
        return x
