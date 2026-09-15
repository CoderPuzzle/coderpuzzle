import heapq
from typing import List


class Solution:
    def maxProbability(
        self, n: int, edges: List[List[int]], succProb: List[float], start_node: int, end_node: int
    ) -> float:
        adjacency: List[List[tuple[int, float]]] = [[] for _ in range(n)]
        for (a, b), probability in zip(edges, succProb):
            adjacency[a].append((b, probability))
            adjacency[b].append((a, probability))

        best = [0.0] * n
        best[start_node] = 1.0
        # Max-heap via negated probabilities, since heapq is a min-heap.
        heap = [(-1.0, start_node)]
        visited = [False] * n
        while heap:
            neg_probability, node = heapq.heappop(heap)
            if visited[node]:
                continue
            visited[node] = True
            if node == end_node:
                return -neg_probability
            for neighbor, edge_probability in adjacency[node]:
                candidate = -neg_probability * edge_probability
                if candidate > best[neighbor]:
                    best[neighbor] = candidate
                    heapq.heappush(heap, (-candidate, neighbor))
        return best[end_node]
