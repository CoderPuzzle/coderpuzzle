from collections import deque
from typing import List, Optional


class Solution:
    def findSafeWalk(self, grid: List[List[int]], health: int) -> bool:
        # A path's cost is the number of unsafe cells it enters, and both
        # endpoints are entered — so grid[0][0] charges immediately. The
        # walk is safe iff some path costs at most health - 1.
        budget = health - 1
        m, n = len(grid), len(grid[0])
        dist = [[m * n + 1] * n for _ in range(m)]
        dist[0][0] = grid[0][0]
        queue = deque([(0, 0)])
        while queue:
            r, c = queue.popleft()
            d = dist[r][c]
            if d > budget:
                continue
            if r == m - 1 and c == n - 1:
                return True
            for nr, nc in ((r - 1, c), (r + 1, c), (r, c - 1), (r, c + 1)):
                if 0 <= nr < m and 0 <= nc < n:
                    nd = d + grid[nr][nc]
                    if nd < dist[nr][nc] and nd <= budget:
                        dist[nr][nc] = nd
                        # Free move joins the current layer; a paid move
                        # goes to the back so layers stay ordered.
                        if grid[nr][nc] == 1:
                            queue.append((nr, nc))
                        else:
                            queue.appendleft((nr, nc))
        return False
