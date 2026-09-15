from typing import List


class Solution:
    def checkValidGrid(self, grid: List[List[int]]) -> bool:
        # The configuration is valid exactly when visit 0 sits at the
        # top-left cell and every pair of consecutive visits lands a
        # knight move apart. Map each visit number to its cell, then
        # verify the deltas pairwise with the arithmetic move test
        # (one step in one axis, two steps in the other).
        if grid[0][0] != 0:
            return False
        n = len(grid)
        pos = [None] * (n * n)
        for r in range(n):
            for c in range(n):
                pos[grid[r][c]] = (r, c)
        for step in range(1, n * n):
            dr = abs(pos[step][0] - pos[step - 1][0])
            dc = abs(pos[step][1] - pos[step - 1][1])
            if (dr, dc) != (1, 2) and (dr, dc) != (2, 1):
                return False
        return True
