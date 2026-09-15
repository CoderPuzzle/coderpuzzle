from typing import List, Optional
import heapq


class Solution:
    def minimumEffortPath(self, heights: List[List[int]]) -> int:
        rows, cols = len(heights), len(heights[0])
        # Bottleneck shortest path: Dijkstra with max in place of addition —
        # a path's effort is the largest height difference along it, and the
        # smallest tentative effort popped is already final.
        dist = [[float("inf")] * cols for _ in range(rows)]
        dist[0][0] = 0
        heap = [(0, 0, 0)]
        while heap:
            d, r, c = heapq.heappop(heap)
            # The first time the goal is popped its effort is optimal.
            if r == rows - 1 and c == cols - 1:
                return d
            # Stale-entry guard: skip outdated heap records.
            if d > dist[r][c]:
                continue
            for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols:
                    nd = max(d, abs(heights[nr][nc] - heights[r][c]))
                    # Relax only when the bottleneck effort strictly improves.
                    if nd < dist[nr][nc]:
                        dist[nr][nc] = nd
                        heapq.heappush(heap, (nd, nr, nc))
        return 0
