import heapq


class Solution:
    def minimumCost(
        self,
        source: str,
        target: str,
        original: list[str],
        changed: list[str],
        cost: list[int],
    ) -> int:
        # A conversion rule is a directed edge in the 26-letter cost graph;
        # the cheapest a->b conversion is the shortest path a->b.
        adj = [[] for _ in range(26)]
        for o, c, w in zip(original, changed, cost):
            # Duplicate rules for the same pair need no care: the relaxation test keeps the cheaper copy.
            adj[ord(o) - 97].append((ord(c) - 97, w))
        INF = float("inf")
        dist = [[INF] * 26 for _ in range(26)]
        for src in range(26):
            # Dijkstra from src: with positive costs the smallest tentative pop
            # is already final, so every letter settles exactly once.
            row = dist[src]
            row[src] = 0
            heap = [(0, src)]
            while heap:
                d, u = heapq.heappop(heap)
                # Stale-entry guard: skip outdated heap records.
                if d > row[u]:
                    continue
                for v, w in adj[u]:
                    nd = d + w
                    # Relax only when the route strictly improves.
                    if nd < row[v]:
                        row[v] = nd
                        heapq.heappush(heap, (nd, v))
        total = 0
        for s, t in zip(source, target):
            # Matching characters convert for free.
            if s == t:
                continue
            d = dist[ord(s) - 97][ord(t) - 97]
            if d == INF:
                return -1
            total += d
        return total
