from typing import List, Optional
from collections import deque


class Solution:
    def maxDistance(self, grid: List[List[int]]) -> int:
        n = len(grid)
        # copy so the input is not mutated; the copy doubles as visited marks
        g = [row[:] for row in grid]
        queue = deque()
        # multi-source BFS: every land cell starts at distance 0, so the
        # first wavefront arrival is exactly each cell's nearest-land distance
        for i in range(n):
            for j in range(n):
                if g[i][j] == 1:
                    queue.append((i, j))
        # all water (empty seed) or all land: no distance exists
        if not queue or len(queue) == n * n:
            return -1
        dist = 0
        while queue:
            # expand one full level per round; dist counts levels processed
            dist += 1
            for _ in range(len(queue)):
                i, j = queue.popleft()
                # 4-directional steps match Manhattan distance on this grid
                for ni, nj in ((i + 1, j), (i - 1, j), (i, j + 1), (i, j - 1)):
                    if 0 <= ni < n and 0 <= nj < n and g[ni][nj] == 0:
                        # flip to 1 on enqueue: each cell is queued once
                        g[ni][nj] = 1
                        queue.append((ni, nj))
        # the last round absorbed nothing new, so the deepest level is dist-1
        return dist - 1
