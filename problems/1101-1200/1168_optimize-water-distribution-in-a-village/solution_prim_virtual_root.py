import heapq


class Solution:
    def minCostToSupplyWater(self, n: int, wells: list[int], pipes: list[list[int]]) -> int:
        # Prim over sites 1..n plus a virtual node 0 (source edges): grow the
        # tree outward from node 0, always settling the cheapest frontier
        # edge; an edge must beat the site's recorded best to be pushed.
        adj = [[] for _ in range(n + 1)]
        for i in range(n):
            adj[0].append((wells[i], i + 1))
            adj[i + 1].append((wells[i], 0))
        for house1, house2, cost in pipes:
            adj[house1].append((cost, house2))
            adj[house2].append((cost, house1))

        best = [float("inf")] * (n + 1)
        best[0] = 0
        visited = [False] * (n + 1)
        heap = [(0, 0)]
        total = 0
        taken = 0
        while heap:
            cost, site = heapq.heappop(heap)
            # Stale-entry guard: the site already joined the tree earlier.
            if visited[site]:
                continue
            visited[site] = True
            total += cost
            taken += 1
            if taken == n + 1:
                break
            for w, v in adj[site]:
                # Relax only when the link strictly improves the site's best.
                if not visited[v] and w < best[v]:
                    best[v] = w
                    heapq.heappush(heap, (w, v))
        return total
