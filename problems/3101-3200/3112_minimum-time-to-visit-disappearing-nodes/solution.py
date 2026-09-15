import heapq
from typing import List


class Solution:
    def minimumTime(self, n: int, edges: List[List[int]], disappear: List[int]) -> List[int]:
        # Dijkstra from node 0 with one extra rule: arriving at or after a
        # node's disappearance instant means it was never visited, so such a
        # settlement propagates nothing onward either.
        adj = [[] for _ in range(n)]
        for u, v, w in edges:
            adj[u].append((v, w))
            adj[v].append((u, w))
        # Every settled distance is < max(disappear) <= 10^5, so pushes stay
        # below 2 * 10^5 and this sentinel can never collide with a real one.
        BIG = 1 << 29
        dist = [BIG] * n
        dist[0] = 0
        heap = [(0, 0)]
        while heap:
            d, u = heapq.heappop(heap)
            if d != dist[u]:
                continue  # stale entry
            if d >= disappear[u]:
                continue  # gone the moment we arrive; cannot be visited
            for v, w in adj[u]:
                if d + w < dist[v]:
                    dist[v] = d + w
                    heapq.heappush(heap, (d + w, v))
        return [dist[i] if dist[i] < disappear[i] else -1 for i in range(n)]
