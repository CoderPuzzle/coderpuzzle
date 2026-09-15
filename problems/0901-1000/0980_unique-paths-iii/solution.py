from typing import List


class Solution:
    def uniquePathsIII(self, grid: List[List[int]]) -> int:
        # A qualifying walk steps on every non-obstacle square exactly once
        # and reaches the ending square last — a Hamiltonian path of the
        # walkable squares, counted by walking every candidate. m * n is at
        # most 20, so one integer is the visited set: bit r * n + c. The
        # scan finds the start and builds `full`, the mask of every
        # walkable square; a walk counts exactly when it steps onto the
        # ending square with mask == full.
        m, n = len(grid), len(grid[0])
        full = 0
        start = None
        for i in range(m):
            for j in range(n):
                if grid[i][j] != -1:
                    full |= 1 << (i * n + j)
                if grid[i][j] == 1:
                    start = (i, j)

        def dfs(r: int, c: int, mask: int) -> int:
            # No square may be walked twice, so meeting the ending square
            # ends the walk whether or not it is complete.
            if grid[r][c] == 2:
                return 1 if mask == full else 0
            paths = 0
            for nr, nc in ((r - 1, c), (r + 1, c), (r, c - 1), (r, c + 1)):
                if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] != -1:
                    bit = 1 << (nr * n + nc)
                    if not mask & bit:
                        paths += dfs(nr, nc, mask | bit)
            return paths

        return dfs(start[0], start[1], 1 << (start[0] * n + start[1]))
