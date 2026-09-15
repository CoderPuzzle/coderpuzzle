from typing import List


class Solution:
    def minimumTotal(self, triangle: List[List[int]]) -> int:
        # Work upward from the bottom: row[j] is the cheapest path sum from
        # column j of the row being folded down to the bottom, so a single
        # array of n entries is all the state the scan ever needs.
        row = list(triangle[-1])
        for i in range(len(triangle) - 2, -1, -1):
            for j in range(i + 1):
                # From (i, j) the two allowed steps land on (i + 1, j) and
                # (i + 1, j + 1); both sums are final before the overwrite
                # retires row[j].
                row[j] = triangle[i][j] + min(row[j], row[j + 1])
        return row[0]
