from typing import List


class Solution:
    def maxCount(self, m: int, n: int, ops: List[List[int]]) -> int:
        # Every operation covers the prefix rectangle anchored at the top-left
        # corner, so the cells incremented by all of them form the rectangle
        # sized by the smallest a and the smallest b; only those cells can
        # hold the maximum. Starting both minima at m and n covers empty ops,
        # where every cell stays 0 and all m*n cells are maximal.
        min_a, min_b = m, n
        for a, b in ops:
            if a < min_a:
                min_a = a
            if b < min_b:
                min_b = b
        return min_a * min_b
