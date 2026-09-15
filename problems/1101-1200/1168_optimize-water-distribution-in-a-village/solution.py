from typing import List, Optional


class Solution:
    def minCostToSupplyWater(self, n: int, wells: List[int], pipes: List[List[int]]) -> int:
        # Kruskal over houses 1..n plus a virtual node 0 (well edges).
        edges = []
        for i in range(n):
            edges.append((wells[i], 0, i + 1))
        for house1, house2, cost in pipes:
            edges.append((cost, house1, house2))
        edges.sort()

        parent = list(range(n + 1))

        def find(x):
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        total = 0
        used = 0
        for cost, a, b in edges:
            ra, rb = find(a), find(b)
            if ra != rb:
                parent[ra] = rb
                total += cost
                used += 1
                if used == n:
                    break
        return total
