import heapq
from typing import List


class Solution:
    def minTime(self, n: int, edges: List[List[int]]) -> int:
        # Earliest-arrival Dijkstra: dist[u] is the soonest time you can be
        # standing on u. Waiting is always allowed, so an edge leaving u at
        # time t departs at max(t, start) — never later, because a later
        # departure only arrives later — provided that moment still lies
        # inside the edge's window.
        adj = [[] for _ in range(n)]
        for u, v, start, end in edges:
            adj[u].append((v, start, end))
        dist = [float("inf")] * n
        dist[0] = 0
        heap = [(0, 0)]
        while heap:
            t, u = heapq.heappop(heap)
            if t > dist[u]:
                continue
            for v, start, end in adj[u]:
                depart = t if t >= start else start
                if depart <= end:
                    arrive = depart + 1
                    if arrive < dist[v]:
                        dist[v] = arrive
                        heapq.heappush(heap, (arrive, v))
        return -1 if dist[n - 1] == float("inf") else dist[n - 1]
