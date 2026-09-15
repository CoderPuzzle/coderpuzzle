from typing import List, Optional

MOD = 10**9 + 7


class Solution:
    def maxProductPath(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        max_row = [0] * n
        min_row = [0] * n
        max_row[0] = min_row[0] = grid[0][0]
        for j in range(1, n):
            value = max_row[j - 1] * grid[0][j]
            max_row[j] = min_row[j] = value

        for i in range(1, m):
            new_max = [0] * n
            new_min = [0] * n
            value = max_row[0] * grid[i][0]
            new_max[0] = new_min[0] = value
            for j in range(1, n):
                cur = grid[i][j]
                candidates = (
                    max_row[j] * cur,
                    min_row[j] * cur,
                    new_max[j - 1] * cur,
                    new_min[j - 1] * cur,
                )
                new_max[j] = max(candidates)
                new_min[j] = min(candidates)
            max_row, min_row = new_max, new_min

        best = max_row[n - 1]
        return best % MOD if best >= 0 else -1
