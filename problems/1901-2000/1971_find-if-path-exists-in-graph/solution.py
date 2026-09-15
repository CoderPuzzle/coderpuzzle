from typing import List
from collections import deque


class Solution:
    def validPath(self, n: int, edges: List[List[int]], source: int, destination: int) -> bool:
        # Build the adjacency list, then run a breadth-first search from
        # source. The graph is undirected, so every edge is added in both
        # directions. A visited array keeps the search from re-processing
        # nodes; if destination is reached the path exists, and when the
        # queue empties without reaching it, no path can exist either.
        graph = [[] for _ in range(n)]
        for u, v in edges:
            graph[u].append(v)
            graph[v].append(u)
        if source == destination:
            return True
        visited = [False] * n
        visited[source] = True
        pending = deque([source])
        while pending:
            node = pending.popleft()
            for neighbor in graph[node]:
                if neighbor == destination:
                    return True
                if not visited[neighbor]:
                    visited[neighbor] = True
                    pending.append(neighbor)
        return False
