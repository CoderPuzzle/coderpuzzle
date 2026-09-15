import heapq
from typing import List


class Solution:
    def minCost(self, n: int, prices: List[int], roads: List[List[int]]) -> List[int]:
        graph = [[] for _ in range(n)]
        for u, v, cost, tax in roads:
            graph[u].append((v, cost, cost * tax))
            graph[v].append((u, cost, cost * tax))

        def dijkstra(start: int, loaded: bool) -> List[int]:
            distance = [10**30] * n
            distance[start] = 0
            heap = [(0, start)]
            while heap:
                current, node = heapq.heappop(heap)
                if current != distance[node]:
                    continue
                for neighbor, empty_cost, loaded_cost in graph[node]:
                    candidate = current + (loaded_cost if loaded else empty_cost)
                    if candidate < distance[neighbor]:
                        distance[neighbor] = candidate
                        heapq.heappush(heap, (candidate, neighbor))
            return distance

        answer = []
        for start in range(n):
            empty_distance = dijkstra(start, False)
            loaded_distance = dijkstra(start, True)
            answer.append(
                min(
                    prices[shop] + empty_distance[shop] + loaded_distance[shop]
                    for shop in range(n)
                    if empty_distance[shop] < 10**30
                )
            )
        return answer
