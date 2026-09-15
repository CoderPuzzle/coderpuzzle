import heapq
from typing import List


class Solution:
    def minTimeToReach(self, moveTime: List[List[int]]) -> int:
        # Waiting inside a room is free, but a move into an adjacent room
        # takes exactly one second and cannot start before the target room
        # opens, so a cell settled at time t settles a neighbour at
        # max(t, moveTime[next]) + 1. That relaxation never lowers a
        # settled time, so this is shortest-path terrain for Dijkstra: pop
        # cells from a min-heap of arrival times, skip stale entries, and
        # the first settle of a cell is its final time.
        n, m = len(moveTime), len(moveTime[0])
        infinity = 1 << 62
        dist = [[infinity] * m for _ in range(n)]
        dist[0][0] = 0
        heap = [(0, 0, 0)]
        while heap:
            t, i, j = heapq.heappop(heap)
            if t > dist[i][j]:
                continue
            for ni, nj in ((i - 1, j), (i + 1, j), (i, j - 1), (i, j + 1)):
                if 0 <= ni < n and 0 <= nj < m:
                    nt = max(t, moveTime[ni][nj]) + 1
                    if nt < dist[ni][nj]:
                        dist[ni][nj] = nt
                        heapq.heappush(heap, (nt, ni, nj))
        return dist[n - 1][m - 1]
