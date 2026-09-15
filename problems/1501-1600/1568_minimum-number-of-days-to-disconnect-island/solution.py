from typing import List, Optional


class Solution:
    def minDays(self, grid: List[List[int]]) -> int:
        rows = len(grid)
        cols = len(grid[0])

        def island_count() -> int:
            seen = [[False] * cols for _ in range(rows)]
            count = 0
            for r in range(rows):
                for c in range(cols):
                    if grid[r][c] == 1 and not seen[r][c]:
                        count += 1
                        stack = [(r, c)]
                        seen[r][c] = True
                        while stack:
                            cr, cc = stack.pop()
                            for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                                nr, nc = cr + dr, cc + dc
                                if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1 and not seen[nr][nc]:
                                    seen[nr][nc] = True
                                    stack.append((nr, nc))
            return count

        if island_count() != 1:
            return 0

        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == 1:
                    grid[r][c] = 0
                    disconnected = island_count() != 1
                    grid[r][c] = 1
                    if disconnected:
                        return 1

        return 2
