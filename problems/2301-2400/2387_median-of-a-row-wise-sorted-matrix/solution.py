from typing import List, Optional
from bisect import bisect_right


class Solution:
    def matrixMedian(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        # Odd element count, so the median is the (m*n)//2+1-th smallest
        # value — an actual matrix entry, returned exactly.
        need = (m * n) // 2 + 1
        # Binary-search the value itself between the smallest row head and
        # the largest row tail.
        lo = min(row[0] for row in grid)
        hi = max(row[-1] for row in grid)

        def count_le(x):
            # Each row is sorted, so bisect_right counts its <=x entries in
            # O(log n); row counts add up across the matrix.
            return sum(bisect_right(row, x) for row in grid)

        # Find the smallest x with count_le(x) >= need. It must occur in
        # the matrix, else the counts at x and x-1 would be equal.
        while lo < hi:
            mid = (lo + hi) // 2
            if count_le(mid) >= need:
                hi = mid
            else:
                lo = mid + 1
        return lo
