from typing import List, Optional


class Solution:
    def minScore(self, n: int, roads: List[List[int]]) -> int:
        # A path may reuse roads, so every road whose two endpoints are
        # reachable from city 1 belongs to some valid path. Discover the
        # component by walking it: build the adjacency list, flood
        # outward from city 1 with an explicit stack, then take the
        # smallest distance among the roads the flood reached.
        adjacency = [[] for _ in range(n + 1)]
        for a, b, _ in roads:
            adjacency[a].append(b)
            adjacency[b].append(a)

        reached = [False] * (n + 1)
        reached[1] = True
        stack = [1]
        while stack:
            city = stack.pop()
            for other in adjacency[city]:
                if not reached[other]:
                    reached[other] = True
                    stack.append(other)

        best = 10**9
        for a, b, d in roads:
            if reached[a] and d < best:
                best = d
        return best
