import heapq


class Solution:
    def minimumCost(self, n: int, connections: list[list[int]]) -> int:
        # adjacency over n + 1 slots (index 0 unused; nodes are 1-based);
        # each link is filed once per direction
        adj = [[] for _ in range(n + 1)]
        for x, y, cost in connections:
            adj[x].append((cost, y))
            adj[y].append((cost, x))

        visited = [False] * (n + 1)
        total = 0
        settled = 0
        # Prim: grow one tree outward from node 1; the cheapest offer
        # leaving the tree is always safe to buy
        heap = [(0, 1)]
        while heap and settled < n:
            cost, v = heapq.heappop(heap)
            # stale-entry guard: v already joined via an offer at most
            # this cheap
            if visited[v]:
                continue
            visited[v] = True
            total += cost
            settled += 1
            for w, u in adj[v]:
                if not visited[u]:
                    heapq.heappush(heap, (w, u))
        # queue drained before every node joined: the catalogue cannot
        # connect all n nodes
        return total if settled == n else -1
