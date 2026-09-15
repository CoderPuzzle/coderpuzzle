from typing import List


class Solution:
    def tripletCount(self, a: List[int], b: List[int], c: List[int]) -> int:
        # A triplet's XOR has an even number of set bits exactly when an
        # even number of the three operands carries an odd popcount: every
        # bit position of the XOR holds the mod-2 sum of the operands'
        # bits there, so the XOR preserves the parity of the total
        # set-bit count. Counting the even- and odd-parity elements of
        # each array leaves four parity classes, and the answer sums the
        # three products that pick zero or two odd parities.
        evens = [0, 0, 0]
        odds = [0, 0, 0]
        for i, nums in enumerate((a, b, c)):
            for x in nums:
                if bin(x).count("1") % 2 == 0:
                    evens[i] += 1
                else:
                    odds[i] += 1
        return (
            evens[0] * evens[1] * evens[2]
            + odds[0] * odds[1] * evens[2]
            + odds[0] * evens[1] * odds[2]
            + evens[0] * odds[1] * odds[2]
        )
