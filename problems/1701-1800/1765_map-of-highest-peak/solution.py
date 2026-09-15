from typing import List, Optional
from collections import deque


class Solution:
    def highestPeak(self, isWater: List[List[int]]) -> List[List[int]]:
        m, n = len(isWater), len(isWater[0])
        # Optimal height = distance to the nearest water: the two rules cap
        # every cell there, and assigning exactly that maximizes all cells
        # at once (neighboring distances differ by at most 1).
        height = [[-1] * n for _ in range(m)]
        q = deque()
        # Multi-source BFS: every water cell starts at height 0; each BFS
        # ring is one step farther from some water cell.
        for i in range(m):
            for j in range(n):
                if isWater[i][j] == 1:
                    height[i][j] = 0
                    q.append((i, j))
        while q:
            i, j = q.popleft()
            for di, dj in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                ni, nj = i + di, j + dj
                # height == -1 doubles as the visited marker, so each cell
                # is enqueued once, by its nearest source.
                if 0 <= ni < m and 0 <= nj < n and height[ni][nj] == -1:
                    height[ni][nj] = height[i][j] + 1
                    q.append((ni, nj))
        return height
