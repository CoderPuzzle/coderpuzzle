import heapq
from typing import List


class Solution:
    def shortestPathWithHops(self, n: int, edges: List[List[int]], s: int, d: int, k: int) -> int:
        # Dijkstra over states (node, hops used): staying in a layer pays the
        # edge weight, a hop crosses into the next layer for free; node d pops
        # at the minimum over every way of spending at most k free edges.
        adjacent: List[List[tuple[int, int]]] = [[] for _ in range(n)]
        for a, b, w in edges:
            adjacent[a].append((b, w))
            adjacent[b].append((a, w))
        best = [[float("inf")] * (k + 1) for _ in range(n)]
        best[s][0] = 0
        heap = [(0, s, 0)]
        while heap:
            dist, node, hops = heapq.heappop(heap)
            if dist > best[node][hops]:
                continue
            if node == d:
                return dist
            for neighbor, weight in adjacent[node]:
                candidate = dist + weight
                if candidate < best[neighbor][hops]:
                    best[neighbor][hops] = candidate
                    heapq.heappush(heap, (candidate, neighbor, hops))
                if hops < k and dist < best[neighbor][hops + 1]:
                    best[neighbor][hops + 1] = dist
                    heapq.heappush(heap, (dist, neighbor, hops + 1))
        raise AssertionError("unreachable: the graph is connected")
