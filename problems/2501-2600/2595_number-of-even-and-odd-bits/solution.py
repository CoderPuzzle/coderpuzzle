from typing import List


class Solution:
    def evenOddBit(self, n: int) -> List[int]:
        # Peel the binary representation one bit at a time from the right;
        # the peel counter doubles as the bit index, whose parity routes
        # each set bit into the even or the odd bucket.
        counts = [0, 0]
        pos = 0
        while n > 0:
            if n & 1:
                counts[pos % 2] += 1
            n >>= 1
            pos += 1
        return counts
