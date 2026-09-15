import heapq
from typing import List


class Solution:
    def minimumVisitedCells(self, grid: List[List[int]]) -> int:
        # Every move goes strictly right or down, so row-major order is a
        # topological order: when a cell is reached its distance is final.
        # Two lazy heaps answer "nearest predecessor" in O(log n): rows[i]
        # holds (dis, k) for cells already settled in row i and cols[j]
        # likewise down column j. Entries whose reach no longer covers the
        # current index pop forever — the scan index only ever grows — so
        # the surviving top is the best available source from that side.
        m, n = len(grid), len(grid[0])
        infinity = float("inf")
        dis = [[infinity] * n for _ in range(m)]
        dis[0][0] = 1
        rows = [[] for _ in range(m)]
        cols = [[] for _ in range(n)]
        heapq.heappush(rows[0], (1, 0))
        heapq.heappush(cols[0], (1, 0))
        for i in range(m):
            grow = grid[i]
            di = dis[i]
            heap_i = rows[i]
            for j in range(n):
                if i or j:
                    while heap_i and heap_i[0][1] + grow[heap_i[0][1]] < j:
                        heapq.heappop(heap_i)
                    heap_j = cols[j]
                    while heap_j and heap_j[0][1] + grid[heap_j[0][1]][j] < i:
                        heapq.heappop(heap_j)
                    reach = min(
                        heap_i[0][0] if heap_i else infinity,
                        heap_j[0][0] if heap_j else infinity,
                    )
                    if reach < infinity:
                        step = reach + 1
                        di[j] = step
                        heapq.heappush(heap_i, (step, j))
                        heapq.heappush(heap_j, (step, i))
        last = dis[m - 1][n - 1]
        return last if last < infinity else -1
