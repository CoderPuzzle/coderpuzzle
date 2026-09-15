from typing import List, Optional


class Solution:
    def minimumCost(self, n: int, connections: List[List[int]]) -> int:
        # union-find over n + 1 slots (index 0 unused; cities are 1-based)
        parent = list(range(n + 1))

        def find(x: int) -> int:
            # path halving keeps subsequent finds near-constant
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        total = 0
        components = n
        # Kruskal: scan edges cheapest-first; the greedy exchange argument
        # makes the accepted set a minimum spanning tree
        for x, y, cost in sorted(connections, key=lambda c: c[2]):
            rx, ry = find(x), find(y)
            # take the edge only when it joins two different components,
            # i.e. it closes no cycle
            if rx != ry:
                parent[rx] = ry
                total += cost
                components -= 1
                # one component left: the tree is complete, later edges are
                # all more expensive
                if components == 1:
                    return total
        # edges ran out first: the graph is disconnected
        return -1
