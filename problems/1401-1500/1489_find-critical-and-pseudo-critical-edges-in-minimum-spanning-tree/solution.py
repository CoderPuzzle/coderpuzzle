from typing import List, Optional


class Solution:
    def findCriticalAndPseudoCriticalEdges(self, n: int, edges: List[List[int]]) -> List[List[int]]:
        m = len(edges)

        class DSU:
            def __init__(self, count):
                self.par = list(range(count))
                self.size = [1] * count

            def find(self, x):
                while self.par[x] != x:
                    self.par[x] = self.par[self.par[x]]
                    x = self.par[x]
                return x

            def union(self, a, b):
                a = self.find(a)
                b = self.find(b)
                if a == b:
                    return False
                if self.size[a] < self.size[b]:
                    a, b = b, a
                self.par[b] = a
                self.size[a] += self.size[b]
                return True

        # Sort edge indices by weight once; every per-edge test reuses this order.
        order = sorted(range(m), key=lambda i: edges[i][2])

        def mst_without(skip):
            # Kruskal with one edge skipped; fewer than n - 1 edges used means
            # the graph is disconnected, which counts as infinite weight.
            dsu = DSU(n)
            weight = 0
            used = 0
            for i in order:
                if i == skip:
                    continue
                a, b, w = edges[i]
                if dsu.union(a, b):
                    weight += w
                    used += 1
            return weight if used == n - 1 else float("inf")

        def mst_with(force):
            # Force the edge in first, then complete Kruskal over the rest.
            dsu = DSU(n)
            dsu = DSU(n)
            weight = 0
            used = 0
            a, b, w = edges[force]
            dsu.union(a, b)
            weight += w
            used += 1
            for i in order:
                if i == force:
                    continue
                a, b, w = edges[i]
                if dsu.union(a, b):
                    weight += w
                    used += 1
            return weight if used == n - 1 else float("inf")

        # Base MST weight that both tests measure against.
        base_weight = 0
        dsu = DSU(n)
        for i in order:
            a, b, w = edges[i]
            if dsu.union(a, b):
                base_weight += w

        critical = []
        pseudo = []
        for i in range(m):
            # Deletion raising the weight (or disconnecting) marks an edge
            # critical; the forcing test runs only on survivors, because a
            # critical edge would also pass it.
            if mst_without(i) > base_weight:
                critical.append(i)
            elif mst_with(i) == base_weight:
                pseudo.append(i)

        return [sorted(critical), sorted(pseudo)]
