from typing import List


class Solution:
    def countUnguarded(self, m: int, n: int, guards: List[List[int]], walls: List[List[int]]) -> int:
        WALL, GUARD, GUARDED = -1, -2, 1
        grid = [[0] * n for _ in range(m)]
        for r, c in walls:
            grid[r][c] = WALL
        for r, c in guards:
            grid[r][c] = GUARD

        for r, c in guards:
            for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                row, col = r + dr, c + dc
                while 0 <= row < m and 0 <= col < n and grid[row][col] not in (WALL, GUARD):
                    grid[row][col] = GUARDED
                    row += dr
                    col += dc

        return sum(row.count(0) for row in grid)
