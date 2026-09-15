import heapq
from typing import List


class Solution:
    def minTimeToReach(self, moveTime: List[List[int]]) -> int:
        # Every move flips the parity of i + j, so a walk that has made k
        # moves always stands on a cell with the parity of k — the hint's
        # (cell, move-parity) states collapse onto the cells alone, and
        # the move leaving (i, j) costs 1 when (i + j) is even, else 2.
        # That fixes each cell's outgoing cost, so plain Dijkstra
        # applies: a cell settled at time t offers a neighbour arrival
        # max(t, moveTime[next]) + cost_out(cell), and the first settle
        # is final. Totals stay below 10**9 + 2 * (n + m - 2), far inside
        # exact double precision.
        n, m = len(moveTime), len(moveTime[0])
        infinity = 1 << 62
        dist = [infinity] * (n * m)
        step = [1 if (idx // m + idx % m) % 2 == 0 else 2 for idx in range(n * m)]
        dist[0] = 0
        heap = [(0, 0)]
        while heap:
            t, idx = heapq.heappop(heap)
            if t > dist[idx]:
                continue
            i, j = divmod(idx, m)
            s = step[idx]
            for ni, nj in ((i - 1, j), (i + 1, j), (i, j - 1), (i, j + 1)):
                if 0 <= ni < n and 0 <= nj < m:
                    gate = moveTime[ni][nj]
                    nt = (t if t > gate else gate) + s
                    nidx = ni * m + nj
                    if nt < dist[nidx]:
                        dist[nidx] = nt
                        heapq.heappush(heap, (nt, nidx))
        return dist[n * m - 1]
