from typing import List, Optional


class Solution:
    def validTree(self, n: int, edges: List[List[int]]) -> bool:
        # A tree needs exactly n - 1 edges: fewer cannot connect n nodes,
        # more cannot stay acyclic — any other count fails immediately.
        if len(edges) != n - 1:
            return False
        # Union-Find over the nodes, each starting as its own component.
        parent = list(range(n))

        def find(x):
            # Path halving: point each visited node at its grandparent on
            # the way up, short-circuiting future traversals.
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        for a, b in edges:
            ra, rb = find(a), find(b)
            # Same root: the edge joins two nodes already in one
            # component — it closes a cycle.
            if ra == rb:
                return False
            # Distinct roots: merge the two components.
            parent[ra] = rb
        # All n - 1 edges merged distinct components: connected and
        # acyclic, hence a valid tree.
        return True
