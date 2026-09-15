from typing import List


class Solution:
    def isThereAPath(self, grid: List[List[int]]) -> bool:
        # Monotone moves give cell (i, j) exactly i + j + 1 visited cells,
        # so every balance (#1s - #0s) reachable there lies inside
        # [-(m+n-1), m+n-1]. Carry one integer bitmask per column whose bit
        # b marks a reachable balance of b at the current row; a cell
        # unions the masks of its top and left neighbours and shifts the
        # set by its own value (+1 or -1). The answer is whether balance 0
        # survives at the bottom-right corner.
        m, n = len(grid), len(grid[0])
        half = m + n - 1
        cols = [0] * n
        cols[0] = 1 << (half + (1 if grid[0][0] == 1 else -1))
        for i in range(m):
            for j in range(n):
                if i == 0 and j == 0:
                    continue
                reachable = (cols[j] if i > 0 else 0) | (cols[j - 1] if j > 0 else 0)
                if grid[i][j] == 1:
                    cols[j] = reachable << 1
                else:
                    cols[j] = reachable >> 1
        return (cols[n - 1] >> half) & 1 == 1
