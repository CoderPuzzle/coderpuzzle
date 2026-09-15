from typing import List, Optional

from collections import deque


class Solution:
    def distanceToCycle(self, n: int, edges: List[List[int]]) -> List[int]:
        adj = [[] for _ in range(n)]
        degree = [0] * n
        for a, b in edges:
            adj[a].append(b)
            adj[b].append(a)
            degree[a] += 1
            degree[b] += 1

        # peel off degree-1 leaves; whatever remains is the unique cycle
        removed = [False] * n
        queue = deque(i for i in range(n) if degree[i] == 1)
        while queue:
            u = queue.popleft()
            removed[u] = True
            for v in adj[u]:
                if not removed[v]:
                    degree[v] -= 1
                    if degree[v] == 1:
                        queue.append(v)

        # multi-source BFS from all cycle nodes
        dist = [0] * n
        visited = [False] * n
        bfs = deque()
        for u in range(n):
            if not removed[u]:
                visited[u] = True
                bfs.append(u)
        while bfs:
            u = bfs.popleft()
            for v in adj[u]:
                if not visited[v]:
                    visited[v] = True
                    dist[v] = dist[u] + 1
                    bfs.append(v)
        return dist
