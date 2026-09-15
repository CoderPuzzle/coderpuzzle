from typing import List


class Solution:
    def minOperations(self, grid: List[List[int]], k: int) -> int:
        m, n = len(grid), len(grid[0])
        # Every operation count is an affine function A * T + B of the target
        # T, with A always 0 or 1. Two 2D prefix sums answer the "coverage
        # from already-placed blocks" query for each cell in O(1).
        pa = [[0] * (n + 1) for _ in range(m + 1)]
        pb = [[0] * (n + 1) for _ in range(m + 1)]

        def rect(p, r1, r2, c1, c2):
            if r1 > r2 or c1 > c2:
                return 0
            return p[r2 + 1][c2 + 1] - p[r1][c2 + 1] - p[r2 + 1][c1] + p[r1][c1]

        fixed_t = None  # T fixed by a boundary cell
        low_t = None  # lower bound on T from X >= 0 (A == 1 cells)
        sum_a = 0
        sum_b = 0
        for i in range(m):
            for j in range(n):
                r1 = max(0, i - k + 1)
                c1 = max(0, j - k + 1)
                cov_a = rect(pa, r1, i - 1, c1, j) + rect(pa, i, i, c1, j - 1)
                cov_b = rect(pb, r1, i - 1, c1, j) + rect(pb, i, i, c1, j - 1)
                if i <= m - k and j <= n - k:
                    a = 1 - cov_a
                    b = -grid[i][j] - cov_b
                    if a == 1:
                        low_t = -b if low_t is None else max(low_t, -b)
                    elif a == 0:
                        if b < 0:
                            return -1
                    else:
                        return -1
                    sum_a += a
                    sum_b += b
                else:
                    # Boundary cell: grid[i][j] + cov must equal T.
                    if cov_a == 1:
                        if grid[i][j] + cov_b != 0:
                            return -1
                    elif cov_a == 0:
                        t = grid[i][j] + cov_b
                        if fixed_t is None:
                            fixed_t = t
                        elif fixed_t != t:
                            return -1
                    else:
                        return -1
                    a = 0
                    b = 0
                pa[i + 1][j + 1] = pa[i][j + 1] + pa[i + 1][j] - pa[i][j] + a
                pb[i + 1][j + 1] = pb[i][j + 1] + pb[i + 1][j] - pb[i][j] + b
        if fixed_t is not None:
            if low_t is not None and fixed_t < low_t:
                return -1
            return sum_a * fixed_t + sum_b
        t = low_t if low_t is not None else 0
        return sum_a * t + sum_b
