from typing import List, Optional
from collections import deque


class Solution:
    def shortestPathAllKeys(self, grid: List[str]) -> int:
        m, n = len(grid), len(grid[0])
        start = None
        target = 0
        for i in range(m):
            for j in range(n):
                ch = grid[i][j]
                if ch == "@":
                    start = (i, j)
                elif "a" <= ch <= "f":
                    target |= 1 << (ord(ch) - ord("a"))
        queue = deque([(start[0], start[1], 0)])
        dist = {(start[0], start[1], 0): 0}
        while queue:
            r, c, mask = queue.popleft()
            if mask == target:
                return dist[(r, c, mask)]
            for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nr, nc = r + dr, c + dc
                if not (0 <= nr < m and 0 <= nc < n):
                    continue
                ch = grid[nr][nc]
                if ch == "#":
                    continue
                if "A" <= ch <= "F" and not (mask & (1 << (ord(ch) - ord("A")))):
                    continue
                nmask = mask
                if "a" <= ch <= "f":
                    nmask |= 1 << (ord(ch) - ord("a"))
                state = (nr, nc, nmask)
                if state not in dist:
                    dist[state] = dist[(r, c, mask)] + 1
                    queue.append(state)
        return -1
