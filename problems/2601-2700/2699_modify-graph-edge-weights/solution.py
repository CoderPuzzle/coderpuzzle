import heapq
from typing import List


class Solution:
    def modifiedGraphEdges(
        self,
        n: int,
        edges: List[List[int]],
        source: int,
        destination: int,
        target: int,
    ) -> List[List[int]]:
        inf = 1 << 60

        def dijkstra(weights: List[int], start: int) -> List[int]:
            # Weights <= 0 are skipped, so passing the raw list treats every
            # -1 edge as absent, while passing the working copy gives the
            # current assignment.
            graph = [[] for _ in range(n)]
            for index, (u, v, _original) in enumerate(edges):
                if weights[index] <= 0:
                    continue
                graph[u].append((v, weights[index]))
                graph[v].append((u, weights[index]))

            distance = [inf] * n
            distance[start] = 0
            queue = [(0, start)]
            while queue:
                dist, node = heapq.heappop(queue)
                if dist > distance[node]:
                    continue
                for neighbor, weight in graph[node]:
                    candidate = dist + weight
                    if candidate < distance[neighbor]:
                        distance[neighbor] = candidate
                        heapq.heappush(queue, (candidate, neighbor))
            return distance

        untouched = [w for _, _, w in edges]
        if dijkstra(untouched, source)[destination] < target:
            return []

        weights = [w if w > 0 else 1 for w in untouched]
        if dijkstra(weights, source)[destination] > target:
            return []

        while True:
            distances = dijkstra(weights, source)
            current = distances[destination]
            if current == target:
                break

            reverse = dijkstra(weights, destination)
            deficit = target - current
            best_index, best_key = -1, inf
            for index, (u, v, original) in enumerate(edges):
                if original != -1:
                    continue
                keys = []
                if distances[u] + weights[index] + reverse[v] == current:
                    keys.append(distances[u])
                if distances[v] + weights[index] + reverse[u] == current:
                    keys.append(distances[v])
                if keys and min(keys) < best_key:
                    best_key = min(keys)
                    best_index = index
            weights[best_index] += deficit

        return [[u, v, weights[index]] for index, (u, v, _w) in enumerate(edges)]
