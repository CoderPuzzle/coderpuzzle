from typing import List


class Solution:
    def findDiagonalOrder(self, mat: List[List[int]]) -> List[int]:
        # Every anti-diagonal is the set of cells with i + j == d; walk the
        # diagonals in increasing d and let d's parity pick the direction.
        m, n = len(mat), len(mat[0])
        order: List[int] = []
        for d in range(m + n - 1):
            # Rows on diagonal d: the column d - i stays in range exactly for
            # i between max(0, d - n + 1) and min(d, m - 1).
            low = max(0, d - n + 1)
            high = min(d, m - 1)
            if d % 2 == 0:
                # Even diagonal: read it upward, bottom row first.
                for i in range(high, low - 1, -1):
                    order.append(mat[i][d - i])
            else:
                # Odd diagonal: read it downward, top row first.
                for i in range(low, high + 1):
                    order.append(mat[i][d - i])
        return order
