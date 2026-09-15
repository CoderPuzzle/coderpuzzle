from heapq import heappop, heappush
from math import inf


class Graph:
    def __init__(self, n: int, edges: list[list[int]]) -> None:
        # Edges are only appended, never removed or reweighted, so a
        # plain adjacency list never needs invalidating or rebuilding.
        self.adjacency: list[list[tuple[int, int]]] = [[] for _ in range(n)]
        for source, target, cost in edges:
            self.adjacency[source].append((target, cost))

    def addEdge(self, edge: list[int]) -> None:
        source, target, cost = edge
        self.adjacency[source].append((target, cost))

    def shortestPath(self, node1: int, node2: int) -> int:
        if node1 == node2:
            return 0
        # Every cost is positive, so Dijkstra applies: the min-heap
        # hands out nodes in settle order by tentative distance.
        distance = [inf] * len(self.adjacency)
        distance[node1] = 0
        heap: list[tuple[int, int]] = [(0, node1)]
        while heap:
            so_far, node = heappop(heap)
            # Stale entry: the node was already settled through a
            # cheaper route, so skip it.
            if so_far > distance[node]:
                continue
            # Popping node2 settles it, so its distance is final here.
            if node == node2:
                return so_far
            for neighbor, cost in self.adjacency[node]:
                candidate = so_far + cost
                # Only improving relaxations push a fresh entry, so any
                # entry goes stale at most once.
                if candidate < distance[neighbor]:
                    distance[neighbor] = candidate
                    heappush(heap, (candidate, neighbor))
        return -1
