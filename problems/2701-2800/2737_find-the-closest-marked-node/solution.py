import heapq
from typing import List


class Solution:
    def minimumDistance(self, n: int, edges: List[List[int]], s: int, marked: List[int]) -> int:
        # Adjacency lists over DIRECTED edges: u -> v only, never the reverse.
        # Parallel edges both enter the list; relaxation keeps the cheaper one.
        graph = [[] for _ in range(n)]
        for u, v, w in edges:
            graph[u].append((v, w))

        # Dijkstra from s; weights are positive, so each pop finalizes its node.
        infinity = float("inf")
        distances = [infinity] * n
        distances[s] = 0
        heap = [(0, s)]
        while heap:
            distance, node = heapq.heappop(heap)
            if distance != distances[node]:
                continue  # stale entry; the node was finalized earlier
            for neighbor, weight in graph[node]:
                candidate = distance + weight
                if candidate < distances[neighbor]:
                    distances[neighbor] = candidate
                    heapq.heappush(heap, (candidate, neighbor))

        # The answer is the closest marked node; unreachable ones stay at INF.
        best = min(distances[node] for node in marked)
        return -1 if best == infinity else best
