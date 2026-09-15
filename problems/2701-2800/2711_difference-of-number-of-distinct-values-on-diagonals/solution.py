from typing import List


class Solution:
    def differenceOfDistinctValues(self, grid: List[List[int]]) -> List[List[int]]:
        # Each main diagonal is swept once downward and once upward. The
        # downward pass records, per cell, how many distinct values lie
        # strictly left-above (the running set size before inserting the
        # cell itself); the upward pass rebuilds the same count for
        # right-below and combines the two.
        m, n = len(grid), len(grid[0])
        ans = [[0] * n for _ in range(m)]
        starts = [(r, 0) for r in range(m)] + [(0, c) for c in range(1, n)]
        for sr, sc in starts:
            left_above = set()
            length = 0
            r, c = sr, sc
            while r < m and c < n:
                ans[r][c] = len(left_above)
                left_above.add(grid[r][c])
                length += 1
                r += 1
                c += 1
            right_below = set()
            for k in range(length - 1, -1, -1):
                x, y = sr + k, sc + k
                ans[x][y] = abs(ans[x][y] - len(right_below))
                right_below.add(grid[x][y])
        return ans
