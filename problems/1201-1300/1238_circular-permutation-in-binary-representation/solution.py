from typing import List


class Solution:
    def circularPermutation(self, n: int, start: int) -> List[int]:
        # Reflected gray code g(i) = i ^ (i >> 1); XOR-ing every entry by
        # start preserves the one-bit-step property and lands p[0] = start.
        size = 1 << n
        return [start ^ (i ^ (i >> 1)) for i in range(size)]
