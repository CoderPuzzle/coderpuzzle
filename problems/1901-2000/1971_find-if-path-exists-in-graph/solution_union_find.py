from typing import List


class Solution:
    def validPath(self, n: int, edges: List[List[int]], source: int, destination: int) -> bool:
        # No graph is built and nothing is traversed: every edge simply
        # merges the components of its two endpoints, and afterwards a
        # route exists exactly when source and destination were pulled
        # into the same component -- that is, when they share a root.
        parent = list(range(n))

        # Path-halving: splice every other node directly under its
        # grandparent, flattening the tree while walking to the root.
        def find(x):
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        for u, v in edges:
            ru, rv = find(u), find(v)
            if ru != rv:
                parent[ru] = rv
        return find(source) == find(destination)
