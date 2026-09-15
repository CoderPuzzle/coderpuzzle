from typing import List, Optional


class Solution:
    def isBipartite(self, graph: List[List[int]]) -> bool:
        n = len(graph)
        parent = list(range(n))

        def find(node: int) -> int:
            root = node
            while parent[root] != root:
                root = parent[root]
            # Second walk repoints every visited node at the root (path
            # compression), flattening the structure for later finds.
            while parent[node] != root:
                parent[node], node = root, parent[node]
            return root

        def union(a: int, b: int) -> None:
            parent[find(a)] = find(b)

        # Bipartite means the nodes split into two groups with every edge
        # crossing between them, so all of a node's neighbors must be able
        # to share the one opposite group.
        for u in range(n):
            for v in graph[u][1:]:
                # Union u's enemies together: they all belong to one set.
                union(graph[u][0], v)
        # A node sharing a set with one of its own enemies sits inside an
        # odd cycle: not bipartite.
        for u in range(n):
            for v in graph[u]:
                if find(u) == find(v):
                    return False
        return True
