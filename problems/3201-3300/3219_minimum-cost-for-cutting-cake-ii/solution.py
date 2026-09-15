from typing import List


class Solution:
    def minimumCost(self, m: int, n: int, horizontalCut: List[int], verticalCut: List[int]) -> int:
        # Each line is priced once per perpendicular strip alive when it is
        # cut, and swapping two adjacent cuts of different families changes
        # the total by (cheaper - more expensive), so an optimal schedule
        # always takes the globally most expensive remaining line. Merge
        # both arrays largest-first, charging each horizontal cut times the
        # current vertical strip count and vice versa. Totals reach about
        # 2 * 10^13, which is why typed languages widen to 64-bit.
        horizontalCut.sort(reverse=True)
        verticalCut.sort(reverse=True)
        total = 0
        row_pieces = 1
        col_pieces = 1
        i = j = 0
        while i < m - 1 or j < n - 1:
            if j == n - 1 or (i < m - 1 and horizontalCut[i] >= verticalCut[j]):
                total += horizontalCut[i] * col_pieces
                i += 1
                row_pieces += 1
            else:
                total += verticalCut[j] * row_pieces
                j += 1
                col_pieces += 1
        return total
