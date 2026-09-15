from typing import List, Optional


class Solution:
    def colorGrid(self, n: int, m: int, sources: List[List[int]]) -> List[List[int]]:
        from collections import deque

        grid = [[0] * m for _ in range(n)]
        dist = [[-1] * m for _ in range(n)]
        queue = deque()
        for r, c, color in sources:
            grid[r][c] = color
            dist[r][c] = 0
            queue.append((r, c))
        while queue:
            i, j = queue.popleft()
            d = dist[i][j]
            for di, dj in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                ni, nj = i + di, j + dj
                if 0 <= ni < n and 0 <= nj < m:
                    if dist[ni][nj] == -1:
                        dist[ni][nj] = d + 1
                        grid[ni][nj] = grid[i][j]
                        queue.append((ni, nj))
                    elif dist[ni][nj] == d + 1:
                        # reached at the same time step by another color
                        if grid[i][j] > grid[ni][nj]:
                            grid[ni][nj] = grid[i][j]
        return grid
