from typing import List, Optional


class Solution:
    def maxEqualRowsAfterFlips(self, matrix: List[List[int]]) -> int:
        # column flips XOR one fixed mask onto every row at once, so a row
        # turns uniform iff it equals the mask or its complement: exactly
        # the identical-or-complementary rows can be fixed together
        counts = {}
        for row in matrix:
            # canonical key: every cell XOR the row's own first cell —
            # identical rows and complementary rows collapse to one key
            key = tuple(value ^ row[0] for value in row)
            counts[key] = counts.get(key, 0) + 1
        return max(counts.values())
