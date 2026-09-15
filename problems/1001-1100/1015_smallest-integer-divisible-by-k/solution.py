class Solution:
    def smallestRepunitDivByK(self, k: int) -> int:
        # A repunit ends in the digit 1, so it can never be divisible by 2
        # or 5 -- rule those out up front instead of relying on the loop
        # below to exhaust itself.
        if k % 2 == 0 or k % 5 == 0:
            return -1
        # Track only the repunit's remainder mod k (it grows far too large
        # to build directly): appending another 1 turns n into n * 10 + 1.
        # There are only k possible remainders, so by the pigeonhole
        # principle a remainder of 0 must appear within k steps if it is
        # ever going to appear at all.
        remainder = 0
        for length in range(1, k + 1):
            remainder = (remainder * 10 + 1) % k
            if remainder == 0:
                return length
        return -1
