from typing import List, Optional


class Solution:
    def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
        INF = float("inf")
        d = [[INF] * (n + 1) for _ in range(n + 1)]
        for i in range(1, n + 1):
            d[i][i] = 0
        for u, v, w in times:
            if w < d[u][v]:  # keep the smallest parallel-edge weight
                d[u][v] = w
        # Relax every path through each midpoint m: one shot gives all pairs.
        for m in range(1, n + 1):
            for i in range(1, n + 1):
                for j in range(1, n + 1):
                    if d[i][m] + d[m][j] < d[i][j]:
                        d[i][j] = d[i][m] + d[m][j]
        best = 0
        for j in range(1, n + 1):
            # Anything still INF in row k is unreachable from the source.
            if d[k][j] == INF:
                return -1
            best = max(best, d[k][j])
        return best
