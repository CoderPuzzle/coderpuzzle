from typing import List


class Solution:
    def containsCycle(self, grid: List[List[str]]) -> bool:
        rows, cols = len(grid), len(grid[0])
        visited = [[False] * cols for _ in range(rows)]
        for r0 in range(rows):
            for c0 in range(cols):
                if visited[r0][c0]:
                    continue
                visited[r0][c0] = True
                stack = [(r0, c0, -1, -1)]
                while stack:
                    x, y, px, py = stack.pop()
                    for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                        nx, ny = x + dx, y + dy
                        if not (0 <= nx < rows and 0 <= ny < cols):
                            continue
                        if grid[nx][ny] != grid[x][y]:
                            continue
                        if nx == px and ny == py:
                            continue
                        if visited[nx][ny]:
                            return True
                        visited[nx][ny] = True
                        stack.append((nx, ny, x, y))
        return False
