from typing import List, Optional
from collections import deque
from functools import lru_cache


class Solution:
    KNIGHT_MOVES = (
        (-2, -1),
        (-2, 1),
        (-1, -2),
        (-1, 2),
        (1, -2),
        (1, 2),
        (2, -1),
        (2, 1),
    )

    def _distances(self, sx, sy):
        """BFS: minimum knight moves from (sx, sy) to every square."""
        dist = [[-1] * 50 for _ in range(50)]
        dist[sx][sy] = 0
        queue = deque([(sx, sy)])
        while queue:
            x, y = queue.popleft()
            d = dist[x][y]
            for dx, dy in self.KNIGHT_MOVES:
                nx, ny = x + dx, y + dy
                if 0 <= nx < 50 and 0 <= ny < 50 and dist[nx][ny] < 0:
                    dist[nx][ny] = d + 1
                    queue.append((nx, ny))
        return dist

    def maxMoves(self, kx: int, ky: int, positions: List[List[int]]) -> int:
        m = len(positions)
        grids = [self._distances(p[0], p[1]) for p in positions]
        d_start = [g[kx][ky] for g in grids]
        dist = [[0] * m for _ in range(m)]
        for i in range(m):
            xi, yi = positions[i]
            for j in range(m):
                dist[i][j] = grids[j][xi][yi]

        full = (1 << m) - 1

        @lru_cache(maxsize=None)
        def dp(mask, last):
            if mask == full:
                return 0
            # Alice moves (and maximizes) when an even number of pawns are captured.
            maximize = bin(mask).count("1") % 2 == 0
            best = -1 if maximize else float("inf")
            for j in range(m):
                if not (mask >> j) & 1:
                    cand = dist[last][j] + dp(mask | (1 << j), j)
                    if maximize:
                        if cand > best:
                            best = cand
                    else:
                        if cand < best:
                            best = cand
            return best

        best = -1
        for j in range(m):
            cand = d_start[j] + dp(1 << j, j)
            if cand > best:
                best = cand
        return best
