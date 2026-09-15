from typing import List


class Solution:
    def maxConsistentColumns(self, grid: List[List[int]], limit: int) -> int:
        rows = len(grid)
        cols = len(grid[0])
        compatible = [[False] * cols for _ in range(cols)]
        for a in range(cols):
            for b in range(a + 1, cols):
                ok = True
                for r in range(rows):
                    if abs(grid[r][b] - grid[r][a]) > limit:
                        ok = False
                        break
                compatible[a][b] = ok

        dp = [1] * cols
        answer = 1
        for j in range(cols):
            for i in range(j):
                if compatible[i][j]:
                    dp[j] = max(dp[j], dp[i] + 1)
            answer = max(answer, dp[j])
        return answer
