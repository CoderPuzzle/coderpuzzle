import heapq
from typing import List


class Solution:
    def minCost(self, n: int, edges: List[List[int]]) -> int:
        # Every edge (u, v, w) also contributes the single-move reversal
        # v -> u at 2 * w: standing at v, flip v's unused switch on the
        # incoming edge u -> v. Weights are positive, so an optimal trip is a
        # simple path and flips at most one switch per node anyway.
        graph = [[] for _ in range(n)]
        for u, v, w in edges:
            graph[u].append((v, w))
            graph[v].append((u, 2 * w))

        # Dijkstra from node 0; weights are positive, so each pop finalizes.
        infinity = float("inf")
        distances = [infinity] * n
        distances[0] = 0
        heap = [(0, 0)]
        while heap:
            distance, node = heapq.heappop(heap)
            if distance != distances[node]:
                continue  # stale entry; the node was finalized earlier
            for neighbor, weight in graph[node]:
                candidate = distance + weight
                if candidate < distances[neighbor]:
                    distances[neighbor] = candidate
                    heapq.heappush(heap, (candidate, neighbor))

        # An unreached target keeps the infinity sentinel.
        best = distances[n - 1]
        return -1 if best == infinity else best
