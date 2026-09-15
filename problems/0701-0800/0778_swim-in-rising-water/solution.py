from typing import List, Optional
import heapq


class Solution:
    def swimInWater(self, grid: List[List[int]]) -> int:
        n = len(grid)
        INF = float("inf")
        # A path's cost is the max elevation along it, and max is
        # monotone, so Dijkstra's greedy argument holds with max
        # relaxation. dist holds the earliest time each cell is
        # reachable — the start waits for grid[0][0] itself.
        dist = [[INF] * n for _ in range(n)]
        dist[0][0] = grid[0][0]
        heap = [(grid[0][0], 0, 0)]
        while heap:
            t, r, c = heapq.heappop(heap)
            # First pop of the target is optimal: cells settle in order
            # of their true earliest time.
            if r == n - 1 and c == n - 1:
                return t
            # Skip stale entries superseded by a better settled time.
            if t > dist[r][c]:
                continue
            for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < n and 0 <= nc < n:
                    # Extending a path can only keep or raise its time.
                    nt = max(t, grid[nr][nc])
                    if nt < dist[nr][nc]:
                        dist[nr][nc] = nt
                        heapq.heappush(heap, (nt, nr, nc))
        return dist[n - 1][n - 1]
