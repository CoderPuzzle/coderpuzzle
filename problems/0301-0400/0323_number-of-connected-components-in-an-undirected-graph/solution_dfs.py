from typing import List, Optional


class Solution:
    def countComponents(self, n: int, edges: List[List[int]]) -> int:
        # Both directions per edge: the graph is undirected, so each
        # endpoint must list the other among its neighbors.
        adjacency = [[] for _ in range(n)]
        for a, b in edges:
            adjacency[a].append(b)
            adjacency[b].append(a)
        visited = [False] * n
        components = 0
        for start in range(n):
            if visited[start]:
                continue
            # An unvisited node during the sweep starts a new component;
            # this one traversal absorbs exactly one component.
            components += 1
            visited[start] = True
            stack = [start]
            while stack:
                node = stack.pop()
                for other in adjacency[node]:
                    if not visited[other]:
                        # Mark at push time so no node is stacked twice;
                        # membership is by visitation, so a node shared by
                        # many edges is still discovered exactly once.
                        visited[other] = True
                        stack.append(other)
        return components
