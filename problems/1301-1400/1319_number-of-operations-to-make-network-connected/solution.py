from typing import List, Optional


class Solution:
    def makeConnected(self, n: int, connections: List[List[int]]) -> int:
        # Connecting n computers needs at least n-1 cables; with fewer the
        # task is impossible no matter how cables are rearranged.
        if len(connections) < n - 1:
            return -1
        parent = list(range(n))

        def find(x):
            # Union-find with path halving: point each node at its
            # grandparent while climbing toward the root.
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        # Count components: every union between two different roots merges
        # two components; a cable whose endpoints already share a root is
        # redundant (the spare cable the counting argument relies on).
        components = n
        for a, b in connections:
            ra, rb = find(a), find(b)
            if ra != rb:
                parent[ra] = rb
                components -= 1
        # Each move (relocating one spare cable) links two components, so
        # the minimum number of moves is components - 1.
        return components - 1
