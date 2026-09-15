from typing import List, Optional


class Solution:
    def findTheCity(self, n: int, edges: List[List[int]], distanceThreshold: int) -> int:
        # With n <= 100, compute all-pairs distances at once: 0 diagonal,
        # symmetric direct weights, INF elsewhere.
        INF = float("inf")
        dist = [[INF] * n for _ in range(n)]
        for i in range(n):
            dist[i][i] = 0
        for a, b, w in edges:
            dist[a][b] = dist[b][a] = w
        # Floyd-Warshall: relax dist[i][j] through intermediate node k. The
        # INF guard skips rows that cannot improve anything this pass.
        for k in range(n):
            dk = dist[k]
            for i in range(n):
                dik = dist[i][k]
                if dik == INF:
                    continue
                di = dist[i]
                for j in range(n):
                    candidate = dik + dk[j]
                    if candidate < di[j]:
                        di[j] = candidate
        # Ascending scan with a strictly-smaller count (or equal count at a
        # larger index) implements the tie-break: greatest city number wins.
        best_city = -1
        best_count = INF
        for i in range(n):
            count = sum(1 for j in range(n) if j != i and dist[i][j] <= distanceThreshold)
            if count < best_count or (count == best_count and i > best_city):
                best_city, best_count = i, count
        return best_city
