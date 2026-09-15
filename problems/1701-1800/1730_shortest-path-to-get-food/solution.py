from typing import List, Optional
from collections import deque


class Solution:
    def getFood(self, grid: List[List[str]]) -> int:
        m, n = len(grid), len(grid[0])
        start = None
        for i in range(m):
            for j in range(n):
                if grid[i][j] == "*":
                    start = (i, j)
        dist = [[-1] * n for _ in range(m)]
        dist[start[0]][start[1]] = 0
        q = deque([start])
        while q:
            i, j = q.popleft()
            if grid[i][j] == "#":
                return dist[i][j]
            for di, dj in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                ni, nj = i + di, j + dj
                if 0 <= ni < m and 0 <= nj < n and grid[ni][nj] != "X" and dist[ni][nj] == -1:
                    dist[ni][nj] = dist[i][j] + 1
                    q.append((ni, nj))
        return -1
