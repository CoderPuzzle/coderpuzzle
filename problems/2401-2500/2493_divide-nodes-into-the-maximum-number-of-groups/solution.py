from typing import List, Optional
from collections import deque


class Solution:
    def magnificentSets(self, n: int, edges: List[List[int]]) -> int:
        graph = [[] for _ in range(n + 1)]
        for a, b in edges:
            graph[a].append(b)
            graph[b].append(a)

        visited = [False] * (n + 1)
        total = 0

        for start in range(1, n + 1):
            if visited[start]:
                continue
            # collect the connected component
            component = []
            stack = [start]
            visited[start] = True
            while stack:
                u = stack.pop()
                component.append(u)
                for v in graph[u]:
                    if not visited[v]:
                        visited[v] = True
                        stack.append(v)

            best = 0
            for source in component:
                dist = {source: 0}
                queue = deque([source])
                max_depth = 0
                bipartite = True
                while queue:
                    u = queue.popleft()
                    for v in graph[u]:
                        if v in dist:
                            if dist[v] == dist[u]:
                                bipartite = False
                        else:
                            dist[v] = dist[u] + 1
                            if dist[v] > max_depth:
                                max_depth = dist[v]
                            queue.append(v)
                if not bipartite:
                    return -1
                if max_depth > best:
                    best = max_depth
            total += best + 1

        return total
