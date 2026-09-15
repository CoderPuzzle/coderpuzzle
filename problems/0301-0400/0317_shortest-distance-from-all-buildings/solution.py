from collections import deque
from typing import List


class Solution:
    def shortestDistance(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        # One BFS per building, not per empty cell: each search floods the
        # empty region once, and every empty cell accumulates its distance
        # from that building plus a count of buildings that reached it.
        dist_sum = [[0] * n for _ in range(m)]
        reach = [[0] * n for _ in range(m)]
        buildings = 0
        for br in range(m):
            for bc in range(n):
                if grid[br][bc] != 1:
                    continue
                buildings += 1
                # BFS starts at the building itself; buildings and obstacles
                # are impassable, so the search only ever walks into empty
                # land and stops where another building blocks the way.
                step = [[-1] * n for _ in range(m)]
                step[br][bc] = 0
                queue = deque([(br, bc)])
                while queue:
                    r, c = queue.popleft()
                    for nr, nc in ((r - 1, c), (r + 1, c), (r, c - 1), (r, c + 1)):
                        if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == 0 and step[nr][nc] < 0:
                            step[nr][nc] = step[r][c] + 1
                            dist_sum[nr][nc] += step[nr][nc]
                            reach[nr][nc] += 1
                            queue.append((nr, nc))
        # A house site must reach EVERY building — a cell sealed off from one
        # building is invalid no matter how short its other distances are.
        best = -1
        for r in range(m):
            for c in range(n):
                if grid[r][c] == 0 and reach[r][c] == buildings and (best < 0 or dist_sum[r][c] < best):
                    best = dist_sum[r][c]
        return best
