from typing import List, Optional
from collections import deque


class Solution:
    def shortestPathLength(self, graph: List[List[int]]) -> int:
        n = len(graph)
        full = (1 << n) - 1
        # Walks may revisit nodes, so the state is (node, visited
        # bitmask) — at most n * 2^n states; the -1 sentinel doubles
        # as the visited marker.
        dist = [[-1] * (1 << n) for _ in range(n)]
        queue = deque()
        # Multi-source: seed every (i, 1 << i) at distance 0 and let
        # BFS discover the best starting node itself.
        for i in range(n):
            dist[i][1 << i] = 0
            queue.append((i, 1 << i))
        while queue:
            node, mask = queue.popleft()
            # First full mask popped is the shortest walk visiting
            # every node.
            if mask == full:
                return dist[node][mask]
            for nxt in graph[node]:
                # Stepping to a neighbor ORs in its bit; BFS explores
                # in nondecreasing distance, so the first reach of a
                # state carries the optimal count.
                nmask = mask | (1 << nxt)
                if dist[nxt][nmask] == -1:
                    dist[nxt][nmask] = dist[node][mask] + 1
                    queue.append((nxt, nmask))
        # Unreachable for the connected graphs the constraints promise.
        return 0
