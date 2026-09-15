import heapq
from typing import List


class Solution:
    def minCostExcludingMax(self, n: int, edges: List[List[int]]) -> int:
        # Excluding the first maximum-weight edge of a path equals excluding
        # any one designated edge (both give sum - maxweight), so Dijkstra
        # runs over states (node, excluded): staying in a layer pays the
        # edge weight, crossing layers excludes exactly one edge for free.
        # A path cost can reach (n - 1) * 5 * 10^4 ~ 2.5 * 10^9, past 32
        # bits, so distances ride in 64-bit integers.
        adjacency = [[] for _ in range(n)]
        for a, b, w in edges:
            adjacency[a].append((b, w))
            adjacency[b].append((a, w))
        best = [[float("inf")] * 2 for _ in range(n)]
        best[0][0] = 0
        heap = [(0, 0, 0)]
        while heap:
            dist, node, used = heapq.heappop(heap)
            if dist > best[node][used]:
                continue
            if node == n - 1 and used == 1:
                return dist
            for neighbor, weight in adjacency[node]:
                if dist + weight < best[neighbor][used]:
                    best[neighbor][used] = dist + weight
                    heapq.heappush(heap, (dist + weight, neighbor, used))
                if used == 0 and dist < best[neighbor][1]:
                    best[neighbor][1] = dist
                    heapq.heappush(heap, (dist, neighbor, 1))
        raise AssertionError("unreachable: the graph is connected")
