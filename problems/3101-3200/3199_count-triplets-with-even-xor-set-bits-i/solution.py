from typing import List


class Solution:
    def tripletCount(self, a: List[int], b: List[int], c: List[int]) -> int:
        # XOR never creates or destroys parity: every bit position of the
        # result holds the mod-2 sum of the operands' bits there, so a
        # triplet's XOR has an even number of set bits exactly when an even
        # number of its operands — zero or two — carries an odd popcount.
        # Counting each array's even/odd elements leaves four qualifying
        # class products to add up.
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
