from typing import List, Optional
import heapq


class Solution:
    def minimumTime(self, grid: List[List[int]]) -> int:
        m = len(grid)
        n = len(grid[0])
        if m == 1 and n == 1:
            return 0
        # If both neighbours of the start cell demand more than 1s we can never
        # leave the start (no adjacent cell to wait on).
        can_right = n > 1 and grid[0][1] <= 1
        can_down = m > 1 and grid[1][0] <= 1
        if not can_right and not can_down:
            return -1

        dist = [[float("inf")] * n for _ in range(m)]
        dist[0][0] = 0
        heap = [(0, 0, 0)]
        directions = ((1, 0), (-1, 0), (0, 1), (0, -1))
        while heap:
            t, r, c = heapq.heappop(heap)
            if t != dist[r][c]:
                continue
            if r == m - 1 and c == n - 1:
                return t
            for dr, dc in directions:
                nr, nc = r + dr, c + dc
                if not (0 <= nr < m and 0 <= nc < n):
                    continue
                nt = t + 1
                if nt < grid[nr][nc]:
                    if (grid[nr][nc] - nt) % 2 == 0:
                        nt = grid[nr][nc]
                    else:
                        nt = grid[nr][nc] + 1
                if nt < dist[nr][nc]:
                    dist[nr][nc] = nt
                    heapq.heappush(heap, (nt, nr, nc))
        return -1
