from typing import List


class Solution:
    def countNegatives(self, grid: List[List[int]]) -> int:
        # Every row is non-increasing, so its negatives are a suffix and the
        # first negative index is one bisection away in O(log n).
        n = len(grid[0])
        count = 0
        for row in grid:
            lo, hi = 0, n
            while lo < hi:
                mid = (lo + hi) // 2
                if row[mid] < 0:
                    hi = mid
                else:
                    lo = mid + 1
            count += n - lo
        return count
