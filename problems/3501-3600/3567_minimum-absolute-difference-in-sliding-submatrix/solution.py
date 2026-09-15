from typing import List


class Solution:
    def minAbsDiff(self, grid: List[List[int]], k: int) -> List[List[int]]:
        # Sorting a window's k*k values places the closest pair of distinct
        # values next to each other, so the smallest adjacent gap in the
        # sorted order is the minimum |a - b|; duplicate values contribute
        # a zero gap, and a k == 1 window has no pair, hence the 0 default.
        m, n = len(grid), len(grid[0])
        answer = [[0] * (n - k + 1) for _ in range(m - k + 1)]
        for i in range(m - k + 1):
            for j in range(n - k + 1):
                window = sorted(grid[r][c] for r in range(i, i + k) for c in range(j, j + k))
                answer[i][j] = min((window[t] - window[t - 1] for t in range(1, k * k)), default=0)
        return answer
