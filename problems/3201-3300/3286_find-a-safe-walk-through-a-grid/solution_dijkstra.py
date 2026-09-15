import heapq
from typing import List


class Solution:
    def findSafeWalk(self, grid: List[List[int]], health: int) -> bool:
        # A path's cost is the number of unsafe cells it enters, and both
        # endpoints are entered — so grid[0][0] charges immediately. The
        # walk is safe iff some path costs at most health - 1.
        budget = health - 1
        m, n = len(grid), len(grid[0])
        dist = [[m * n + 1] * n for _ in range(m)]
        dist[0][0] = grid[0][0]
        heap = [(grid[0][0], 0, 0)]
        while heap:
            d, r, c = heapq.heappop(heap)
            # The first time the goal is popped its cost is optimal.
            if r == m - 1 and c == n - 1:
                return d <= budget
            # Stale-entry guard: skip outdated heap records.
            if d > dist[r][c]:
                continue
            for nr, nc in ((r - 1, c), (r + 1, c), (r, c - 1), (r, c + 1)):
                if 0 <= nr < m and 0 <= nc < n:
                    nd = d + grid[nr][nc]
                    # Relax only when the unsafe count strictly improves.
                    if nd < dist[nr][nc]:
                        dist[nr][nc] = nd
                        heapq.heappush(heap, (nd, nr, nc))
        return False
