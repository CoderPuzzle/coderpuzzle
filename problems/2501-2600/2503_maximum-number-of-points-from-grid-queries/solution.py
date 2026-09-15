import heapq
from typing import List, Optional


class Solution:
    def maxPoints(self, grid: List[List[int]], queries: List[int]) -> List[int]:
        m, n = len(grid), len(grid[0])
        # A query q scores exactly the cells reachable from (0,0) through values
        # < q; that set only grows with q, so answer queries in ascending order
        # against one shared frontier instead of running a BFS per query.
        order = sorted(range(len(queries)), key=lambda i: queries[i])
        answer = [0] * len(queries)
        visited = [[False] * n for _ in range(m)]
        visited[0][0] = True
        # Min-heap frontier keyed by cell value; the start cell is marked
        # visited up front so it must be earned by the pop loop like any other.
        heap = [(grid[0][0], 0, 0)]
        count = 0
        for idx in order:
            q = queries[idx]
            # Pop while the cheapest frontier cell is strictly below q: this is
            # Dijkstra-like expansion in value order, one point per popped cell.
            while heap and heap[0][0] < q:
                _, r, c = heapq.heappop(heap)
                count += 1
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < m and 0 <= nc < n and not visited[nr][nc]:
                        # Mark at push time: no duplicate entries, so each cell
                        # enters and leaves the heap exactly once overall.
                        visited[nr][nc] = True
                        heapq.heappush(heap, (grid[nr][nc], nr, nc))
            # Heap min >= q (or empty): nothing further is reachable for this
            # or any smaller remaining query, so the running count answers it.
            answer[idx] = count
        return answer
