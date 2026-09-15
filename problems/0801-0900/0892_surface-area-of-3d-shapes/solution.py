from typing import List


class Solution:
    def surfaceArea(self, grid: List[List[int]]) -> int:
        # Every exposed face belongs to some tower: an occupied cell owns a
        # top and a bottom face, and each of its four walls shows exactly the
        # strip rising above the neighboring cell (empty ground or the grid's
        # edge is a neighbor of height 0).
        n = len(grid)
        total = 0
        for i in range(n):
            for j in range(n):
                v = grid[i][j]
                if v > 0:
                    total += 2
                    for ni, nj in ((i - 1, j), (i + 1, j), (i, j - 1), (i, j + 1)):
                        neighbor = grid[ni][nj] if 0 <= ni < n and 0 <= nj < n else 0
                        if v > neighbor:
                            total += v - neighbor
        return total
