class Solution:
    def hammingDistance(self, x: int, y: int) -> int:
        # XOR writes a 1 exactly at the positions where x and y differ and
        # a 0 wherever they agree, so the distance is the number of set
        # bits in the pattern. Count them by testing the lowest bit and
        # shifting right until the pattern empties. Inputs are at most
        # 2^31 - 1, so the pattern fits in 31 bits and Python's unbounded
        # ints never need a mask.
        z = x ^ y
        distance = 0
        while z != 0:
            distance += z & 1
            z >>= 1
        return distance
