from typing import List, Optional

import heapq


class Solution:
    def maximumMinimumPath(self, grid: List[List[int]]) -> int:
        rows, cols = len(grid), len(grid[0])
        # Best-first on the highest-valued frontier cell: taking the largest
        # candidate can never lower the running minimum, so the first arrival
        # at the goal carries the maximum bottleneck (Dijkstra with max).
        heap = [(-grid[0][0], 0, 0)]
        visited = [[False] * cols for _ in range(rows)]
        visited[0][0] = True
        best = grid[0][0]
        while heap:
            neg_value, r, c = heapq.heappop(heap)
            # best is the bottleneck (running minimum) of the walk so far.
            best = min(best, -neg_value)
            if r == rows - 1 and c == cols - 1:
                return best
            for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nr, nc = r + dr, c + dc
                # Mark visited on push so each cell enters the heap at most once.
                if 0 <= nr < rows and 0 <= nc < cols and not visited[nr][nc]:
                    visited[nr][nc] = True
                    heapq.heappush(heap, (-grid[nr][nc], nr, nc))
        return best
