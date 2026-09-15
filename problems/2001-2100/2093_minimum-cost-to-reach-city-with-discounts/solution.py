import heapq
from typing import List


class Solution:
    def minimumCost(self, n: int, highways: List[List[int]], discounts: int) -> int:
        graph = [[] for _ in range(n)]
        for left, right, toll in highways:
            graph[left].append((right, toll))
            graph[right].append((left, toll))

        distances = [[float("inf")] * (discounts + 1) for _ in range(n)]
        distances[0][0] = 0
        heap = [(0, 0, 0)]
        while heap:
            cost, city, used = heapq.heappop(heap)
            if cost != distances[city][used]:
                continue
            if city == n - 1:
                return cost
            for neighbor, toll in graph[city]:
                full_cost = cost + toll
                if full_cost < distances[neighbor][used]:
                    distances[neighbor][used] = full_cost
                    heapq.heappush(heap, (full_cost, neighbor, used))
                if used < discounts:
                    discounted_cost = cost + toll // 2
                    if discounted_cost < distances[neighbor][used + 1]:
                        distances[neighbor][used + 1] = discounted_cost
                        heapq.heappush(heap, (discounted_cost, neighbor, used + 1))
        return -1
