import heapq
from typing import List, Optional


class Solution:
    def minCost(self, n: int, roads: List[List[int]], appleCost: List[int], k: int) -> List[int]:
        adj = [[] for _ in range(n + 1)]
        for a, b, c in roads:
            adj[a].append((b, c))
            adj[b].append((a, c))

        answer = []
        # A trip is: reach j, buy, retrace. Any cheaper return path would
        # also be a cheaper outbound path, so the total is
        # appleCost[j] + (k+1)*d(j) with d = shortest distance from start.
        for start in range(1, n + 1):
            # Dijkstra needs the strictly positive road weights; a popped
            # entry older than dist[u] is stale (lazy deletion).
            dist = [float("inf")] * (n + 1)
            dist[start] = 0
            heap = [(0, start)]
            while heap:
                d, u = heapq.heappop(heap)
                if d > dist[u]:
                    continue
                for v, w in adj[u]:
                    nd = d + w
                    if nd < dist[v]:
                        dist[v] = nd
                        heapq.heappush(heap, (nd, v))
            # j = start contributes d = 0, so buying locally is always a
            # candidate.
            best = min(appleCost[j - 1] + (k + 1) * dist[j] for j in range(1, n + 1))
            answer.append(best)
        return answer
