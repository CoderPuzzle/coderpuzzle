import heapq


class Solution:
    def findTheCity(self, n: int, edges: list[list[int]], distanceThreshold: int) -> int:
        # Mirror each undirected edge both ways, so every node can run its own
        # Dijkstra over the adjacency list and pay only for real edges.
        adj = [[] for _ in range(n)]
        for a, b, w in edges:
            adj[a].append((b, w))
            adj[b].append((a, w))
        INF = float("inf")
        counts = [0] * n
        for src in range(n):
            # Dijkstra from src: with positive weights the smallest tentative pop
            # is already final, so every node settles exactly once.
            dist = [INF] * n
            dist[src] = 0
            heap = [(0, src)]
            while heap:
                d, u = heapq.heappop(heap)
                # Stale-entry guard: skip outdated heap records.
                if d > dist[u]:
                    continue
                for v, w in adj[u]:
                    nd = d + w
                    # Relax only when the route strictly improves.
                    if nd < dist[v]:
                        dist[v] = nd
                        heapq.heappush(heap, (nd, v))
            counts[src] = sum(1 for v in range(n) if v != src and dist[v] <= distanceThreshold)
        # Ascending scan with a strictly-smaller count (or equal count at a
        # larger index) implements the tie-break: greatest city number wins.
        best_city = -1
        best_count = INF
        for i in range(n):
            count = counts[i]
            if count < best_count or (count == best_count and i > best_city):
                best_city, best_count = i, count
        return best_city
