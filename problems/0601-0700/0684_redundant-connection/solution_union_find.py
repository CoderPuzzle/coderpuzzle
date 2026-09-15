from typing import List, Optional


class Solution:
    def findRedundantConnection(self, edges: List[List[int]]) -> List[int]:
        parent: dict = {}

        def find(node: int) -> int:
            root = node
            while parent[root] != root:
                root = parent[root]
            # Second walk repoints every visited node at the root (path
            # compression), flattening the structure for later finds.
            while parent[node] != root:
                parent[node], node = root, parent[node]
            return root

        def union(a: int, b: int) -> bool:
            # Unseen nodes register lazily on first touch.
            if a not in parent:
                parent[a] = a
            if b not in parent:
                parent[b] = b
            ra, rb = find(a), find(b)
            # Equal roots mean this edge would reconnect one component: the cycle.
            if ra == rb:
                return False
            parent[ra] = rb
            return True

        # A tree plus one extra edge has exactly one cycle; the first edge
        # failing the union test is the one that closes it.
        for a, b in edges:
            if not union(a, b):
                return [a, b]
        return []
