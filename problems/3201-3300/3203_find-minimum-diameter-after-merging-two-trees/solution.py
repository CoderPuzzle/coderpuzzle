from collections import deque
from typing import List


class Solution:
    def minimumDiameterAfterMerge(self, edges1: List[List[int]], edges2: List[List[int]]) -> int:
        # Whatever the attachment pair, the merged diameter is the max of
        # three candidates: each original diameter, and the path that
        # crosses the new edge -- deepest leg of tree 1 from its attachment
        # node, plus deepest leg of tree 2, plus 1. Only the third term
        # depends on the choice, and each tree contributes at least the
        # length from its own attachment point to its farthest node, whose
        # minimum over all attachment nodes is the radius ceil(d / 2).
        # So connect the two centers: answer = max(d1, d2, r1 + r2 + 1).
        # Each diameter comes from two strictly iterative BFS sweeps;
        # with n, m up to 1e5 the sweeps must not recurse.
        def diameter(edges: List[List[int]]) -> int:
            n = len(edges) + 1
            adj = [[] for _ in range(n)]
            for a, b in edges:
                adj[a].append(b)
                adj[b].append(a)

            def sweep(src: int) -> tuple:
                dist = [-1] * n
                dist[src] = 0
                queue = deque([src])
                far, best = src, 0
                while queue:
                    u = queue.popleft()
                    for v in adj[u]:
                        if dist[v] < 0:
                            dist[v] = dist[u] + 1
                            if dist[v] > best:
                                far, best = v, dist[v]
                            queue.append(v)
                return far, best

            far = sweep(0)[0]
            return sweep(far)[1]

        d1 = diameter(edges1)
        d2 = diameter(edges2)
        return max(d1, d2, (d1 + 1) // 2 + (d2 + 1) // 2 + 1)
