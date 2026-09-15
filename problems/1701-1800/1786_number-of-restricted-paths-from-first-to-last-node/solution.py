import heapq
from typing import List


class Solution:
    def countRestrictedPaths(self, n: int, edges: List[List[int]]) -> int:
        # Dijkstra from node n fixes dist[x] = distanceToLastNode(x).
        # A restricted path strictly decreases that distance at every
        # step, so visiting nodes in increasing distance order makes
        # every count final: each strictly-closer neighbor of u was
        # visited before u. Distances reach ~2*10^9 (n-1 edges of weight
        # 10^5), so they are held as 64-bit values.
        MOD = 10**9 + 7
        adj = [[] for _ in range(n + 1)]
        for u, v, w in edges:
            adj[u].append((v, w))
            adj[v].append((u, w))
        dist = [float("inf")] * (n + 1)
        dist[n] = 0
        heap = [(0, n)]
        while heap:
            d, u = heapq.heappop(heap)
            if d > dist[u]:
                continue
            for v, w in adj[u]:
                if d + w < dist[v]:
                    dist[v] = d + w
                    heapq.heappush(heap, (d + w, v))
        count = [0] * (n + 1)
        count[n] = 1
        for u in sorted(range(1, n + 1), key=lambda x: dist[x]):
            if u == n:
                continue
            total = 0
            for v, _ in adj[u]:
                if dist[u] > dist[v]:
                    total += count[v]
            count[u] = total % MOD
        return count[1]
