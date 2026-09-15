from typing import List, Optional

from collections import deque


class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        if not grid:
            return 0
        rows, cols = len(grid), len(grid[0])
        visited = [[False] * cols for _ in range(rows)]
        count = 0
        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == "1" and not visited[r][c]:
                    count += 1
                    queue = deque([(r, c)])
                    visited[r][c] = True
                    while queue:
                        x, y = queue.popleft()
                        for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                            nx, ny = x + dx, y + dy
                            if 0 <= nx < rows and 0 <= ny < cols and grid[nx][ny] == "1" and not visited[nx][ny]:
                                visited[nx][ny] = True
                                queue.append((nx, ny))
        return count
