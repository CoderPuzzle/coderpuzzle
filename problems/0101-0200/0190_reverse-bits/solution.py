class Solution:
    def reverseBits(self, n: int) -> int:
        # Queue-to-stack transfer of the 32 bits: the accumulator shifts left
        # and takes n's lowest bit, so bit i of n lands at position 31 - i —
        # exactly the pairing the statement's binary tables show.
        reversed_bits = 0
        for _ in range(32):
            reversed_bits = (reversed_bits << 1) | (n & 1)
            n >>= 1
        return reversed_bits
