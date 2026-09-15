from typing import List, Optional


class Solution:
    def findPaths(self, m: int, n: int, maxMove: int, startRow: int, startColumn: int) -> int:
        MOD = 10**9 + 7
        # Zero moves can never leave the grid.
        if maxMove == 0:
            return 0
        # After t passes, prev[i][j] = paths from (i, j) that exit within t moves.
        prev = [[0] * n for _ in range(m)]
        for _ in range(maxMove):
            cur = [[0] * n for _ in range(m)]
            for i in range(m):
                for j in range(n):
                    total = 0
                    for di, dj in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                        ni, nj = i + di, j + dj
                        if ni < 0 or ni >= m or nj < 0 or nj >= n:
                            # An out-of-grid step is itself a path that exits now.
                            total += 1
                        else:
                            # Step inside first, then exit with the remaining budget.
                            total += prev[ni][nj]
                    cur[i][j] = total % MOD
            # Each pass only needs the previous layer.
            prev = cur
        return prev[startRow][startColumn] % MOD
