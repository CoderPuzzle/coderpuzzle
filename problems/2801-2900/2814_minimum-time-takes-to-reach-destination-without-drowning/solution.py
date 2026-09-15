from typing import List
from collections import deque


class Solution:
    def minimumSeconds(self, land: List[List[str]]) -> int:
        m, n = len(land), len(land[0])
        INF = m * n + 1  # later than any reachable second
        sr = sc = dr = dc = 0
        # Water BFS: arrival time of every empty cell. Only '.' floods, so
        # 'S', 'D' and 'X' stay dry (the statement guarantees it for 'D').
        flood = [[INF] * n for _ in range(m)]
        water = deque()
        for r in range(m):
            for c in range(n):
                if land[r][c] == "*":
                    flood[r][c] = 0
                    water.append((r, c))
                elif land[r][c] == "S":
                    sr, sc = r, c
                elif land[r][c] == "D":
                    dr, dc = r, c
        while water:
            r, c = water.popleft()
            step = flood[r][c] + 1
            for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
                if 0 <= nr < m and 0 <= nc < n and land[nr][nc] == "." and flood[nr][nc] == INF:
                    flood[nr][nc] = step
                    water.append((nr, nc))
        # Person BFS: enter '.'/'D' strictly before the water does; the
        # same-second landing ban is the strict '<'.
        seen = [[False] * n for _ in range(m)]
        seen[sr][sc] = True
        queue = deque([(sr, sc, 0)])
        while queue:
            r, c, t = queue.popleft()
            if (r, c) == (dr, dc):
                return t
            for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
                if 0 <= nr < m and 0 <= nc < n and not seen[nr][nc] and land[nr][nc] in ".D" and t + 1 < flood[nr][nc]:
                    seen[nr][nc] = True
                    queue.append((nr, nc, t + 1))
        return -1
