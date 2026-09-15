from collections import deque
from typing import List


class Solution:
    def numEnclaves(self, grid: List[List[int]]) -> int:
        rows, cols = len(grid), len(grid[0])
        # Iterative BFS (explicit queue, not recursion) starting from every
        # land cell already sitting on the boundary: that land can trivially
        # walk off the grid, and so can every land cell it can reach.
        queue = deque()
        for r in range(rows):
            for c in range(cols):
                on_boundary = r == 0 or r == rows - 1 or c == 0 or c == cols - 1
                if on_boundary and grid[r][c] == 1:
                    queue.append((r, c))
                    grid[r][c] = 0

        while queue:
            r, c = queue.popleft()
            for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                    grid[nr][nc] = 0
                    queue.append((nr, nc))

        # Whatever land the fill never reached could never walk off the
        # grid: that's exactly the enclosed count.
        return sum(row.count(1) for row in grid)
