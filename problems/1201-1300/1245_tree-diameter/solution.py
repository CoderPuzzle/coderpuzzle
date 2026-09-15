from typing import List, Optional
from collections import deque


class Solution:
    def treeDiameter(self, edges: List[List[int]]) -> int:
        # No edges: a single-node tree, diameter 0.
        if not edges:
            return 0
        n = len(edges) + 1
        adj = [[] for _ in range(n)]
        for a, b in edges:
            adj[a].append(b)
            adj[b].append(a)

        def bfs(src):
            # -1 doubles as the visited marker; a tree has one path between
            # any two nodes, so BFS distances are true path lengths.
            dist = [-1] * n
            dist[src] = 0
            queue = deque([src])
            far = src
            while queue:
                u = queue.popleft()
                for v in adj[u]:
                    if dist[v] < 0:
                        dist[v] = dist[u] + 1
                        queue.append(v)
                        # Track the farthest node on the fly.
                        if dist[v] > dist[far]:
                            far = v
            return far, dist[far]

        # Double BFS: the farthest node B from any start is an endpoint of a
        # longest path, so B's eccentricity (second pass) is the diameter.
        far, _ = bfs(0)
        _, diameter = bfs(far)
        return diameter
