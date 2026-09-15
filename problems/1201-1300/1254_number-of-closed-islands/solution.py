from typing import List, Optional


class Solution:
    def closedIsland(self, grid: List[List[int]]) -> int:
        rows, cols = len(grid), len(grid[0])
        dirs = ((1, 0), (-1, 0), (0, 1), (0, -1))

        def flood(r, c):
            # Erase land to water as we walk: the fill doubles as the visited
            # marker, and an explicit stack keeps snake-shaped islands from
            # overflowing the recursion stack.
            grid[r][c] = 1
            stack = [(r, c)]
            closed = True
            while stack:
                x, y = stack.pop()
                for dx, dy in dirs:
                    nx, ny = x + dx, y + dy
                    if 0 <= nx < rows and 0 <= ny < cols:
                        if grid[nx][ny] == 0:
                            grid[nx][ny] = 1
                            stack.append((nx, ny))
                    else:
                        # A step off the grid means the component touches
                        # the border, so the whole island is not closed.
                        closed = False
            return closed

        # Each surviving land cell seeds exactly one fill; a fill that never
        # stepped off-grid means the island was surrounded entirely by water.
        count = 0
        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == 0:
                    if flood(r, c):
                        count += 1
        return count
