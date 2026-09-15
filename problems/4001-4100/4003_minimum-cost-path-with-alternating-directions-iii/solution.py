from typing import List, Optional


class Solution:
    def minCost(self, m: int, n: int, penalty: List[List[int]]) -> int:
        import heapq

        INF = float("inf")
        size = m * n
        dist = [[INF, INF] for _ in range(size)]  # [parity 0 (next odd), parity 1 (next even)]
        dist[0][0] = 1  # entrance cost of (0, 0); next action is odd
        pq = [(1, 0, 0)]
        target = size - 1
        while pq:
            cost, cell, parity = heapq.heappop(pq)
            if cost > dist[cell][parity]:
                continue
            if cell == target:
                continue
            i, j = divmod(cell, n)
            is_odd = parity == 0
            for di, dj in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                ni, nj = i + di, j + dj
                if not (0 <= ni < m and 0 <= nj < n):
                    continue
                follows = (is_odd and di + dj > 0) or (not is_odd and di + dj < 0)
                w = (ni + 1) * (nj + 1)
                if not follows:
                    w += penalty[i][j]
                ncell = ni * n + nj
                nparity = 1 - parity
                nc = cost + w
                if nc < dist[ncell][nparity]:
                    dist[ncell][nparity] = nc
                    heapq.heappush(pq, (nc, ncell, nparity))
            # wait flips parity at cost penalty[i][j]
            w = penalty[i][j]
            nparity = 1 - parity
            nc = cost + w
            if nc < dist[cell][nparity]:
                dist[cell][nparity] = nc
                heapq.heappush(pq, (nc, cell, nparity))
        return min(dist[target])
