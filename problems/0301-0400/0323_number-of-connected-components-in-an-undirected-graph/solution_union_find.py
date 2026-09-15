from typing import List, Optional


class Solution:
    def countComponents(self, n: int, edges: List[List[int]]) -> int:
        parent = list(range(n))

        # Path-halving: splice every other node directly under its
        # grandparent, flattening the tree while walking to the root.
        def find(x):
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        # Every node begins as its own component.
        count = n
        for a, b in edges:
            ra, rb = find(a), find(b)
            # An edge joining two distinct roots merges two components;
            # one whose endpoints already share a root is redundant.
            if ra != rb:
                parent[ra] = rb
                count -= 1
        return count
