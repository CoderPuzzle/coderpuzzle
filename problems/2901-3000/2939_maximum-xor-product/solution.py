from typing import List, Optional


class Solution:
    def maximumXorProduct(self, a: int, b: int, n: int) -> int:
        # Decide x's bits from the top down. Bits at or above n are
        # beyond x's reach and stay as they are. Below bit n: when a and
        # b agree on a bit, x can set it in both a^x and b^x — always a
        # win at that height. When they differ, exactly one of a^x and
        # b^x can carry the bit, and giving it to the currently smaller
        # value dominates: it adds bit*(other) to the product instead of
        # bit*(smaller).
        mod = 10**9 + 7
        ax = bx = 0
        for i in range(49, -1, -1):
            bit = 1 << i
            if i >= n:
                if a & bit:
                    ax |= bit
                if b & bit:
                    bx |= bit
            elif (a >> i) & 1 == (b >> i) & 1:
                ax |= bit
                bx |= bit
            elif ax <= bx:
                ax |= bit
            else:
                bx |= bit
        return (ax % mod) * (bx % mod) % mod
