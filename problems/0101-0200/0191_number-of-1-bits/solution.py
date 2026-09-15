class Solution:
    def hammingWeight(self, n: int) -> int:
        # Subtracting one borrows through the trailing zeros and flips the
        # lowest set bit off, so n & (n - 1) clears exactly that bit: the
        # loop runs once per set bit, never touching the zero bits above it.
        count = 0
        while n:
            n &= n - 1
            count += 1
        return count
