from typing import List


class Solution:
    def largestMagicSquare(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        # rs[r][c]: row r-1 prefix; cs: column c-1 prefix; d1/a2: diagonal prefixes.
        rs = [[0] * (n + 1) for _ in range(m + 1)]
        cs = [[0] * (n + 1) for _ in range(m + 1)]
        d1 = [[0] * (n + 2) for _ in range(m + 1)]
        a2 = [[0] * (n + 2) for _ in range(m + 1)]
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                v = grid[i - 1][j - 1]
                rs[i][j] = rs[i][j - 1] + v
                cs[i][j] = cs[i - 1][j] + v
                d1[i][j] = v + d1[i - 1][j - 1]
        for i in range(1, m + 1):
            for j in range(n, 0, -1):
                a2[i][j] = grid[i - 1][j - 1] + a2[i - 1][j + 1]

        def rsum(i, j, k):
            return rs[i + 1][j + k] - rs[i + 1][j]

        def csum(i, j, k):
            return cs[i + k][j + 1] - cs[i][j + 1]

        for k in range(min(m, n), 0, -1):
            for i in range(m - k + 1):
                for j in range(n - k + 1):
                    s = rsum(i, j, k)
                    if any(rsum(i + t, j, k) != s for t in range(1, k)):
                        continue
                    if any(csum(i, j + t, k) != s for t in range(k)):
                        continue
                    if d1[i + k][j + k] - d1[i][j] != s:
                        continue
                    if a2[i + k][j + 1] - a2[i][j + 1 + k] != s:
                        continue
                    return k
        return 1
