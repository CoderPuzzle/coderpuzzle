from typing import List


class Solution:
    def findRedundantDirectedConnection(self, edges: List[List[int]]) -> List[int]:
        # First pass: a node with two parents names the two candidate
        # edges, in input order.
        n = len(edges)
        parent_edge = [-1] * (n + 1)
        cand1 = cand2 = -1
        for i, (u, v) in enumerate(edges):
            if parent_edge[v] != -1:
                cand1, cand2 = parent_edge[v], i
            else:
                parent_edge[v] = i

        dsu = list(range(n + 1))

        def find(node: int) -> int:
            root = node
            while dsu[root] != root:
                root = dsu[root]
            # Second walk repoints every visited node at the root (path
            # compression), flattening the structure for later finds.
            while dsu[node] != root:
                dsu[node], node = root, dsu[node]
            return root

        # Second pass over every edge except the later candidate: a cycle
        # means dropping it is not enough, so the earlier edge is the
        # answer; a clean pass means the later edge is.
        for i, (u, v) in enumerate(edges):
            if i == cand2:
                continue
            ru, rv = find(u), find(v)
            # Equal roots mean this edge would reconnect one component.
            if ru == rv:
                return edges[cand1] if cand2 != -1 else [u, v]
            dsu[ru] = rv
        return edges[cand2]
