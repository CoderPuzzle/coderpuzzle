from typing import List, Optional


class Solution:
    def findAnswer(self, n: int, edges: List[List[int]]) -> List[bool]:
        import heapq

        adj = [[] for _ in range(n)]
        for u, v, w in edges:
            adj[u].append((v, w))
            adj[v].append((u, w))

        INF = float("inf")

        def dijkstra(src):
            dist = [INF] * n
            dist[src] = 0
            pq = [(0, src)]
            while pq:
                d, u = heapq.heappop(pq)
                # stale entry: dist[u] was improved after this was pushed
                if d != dist[u]:
                    continue
                for v, w in adj[u]:
                    nd = d + w
                    if nd < dist[v]:
                        dist[v] = nd
                        heapq.heappush(pq, (nd, v))
            return dist

        dist0 = dijkstra(0)
        distN = dijkstra(n - 1)
        # reference length every shortest 0 -> n-1 path must match
        total = dist0[n - 1]
        # unreachable: no edge lies on a shortest path
        if total == INF:
            return [False] * len(edges)

        ans = []
        for u, v, w in edges:
            # on a shortest path iff d0(one end) + w + dN(other end) == total,
            # tested both ways since the undirected edge may be crossed either way
            if dist0[u] + w + distN[v] == total or dist0[v] + w + distN[u] == total:
                ans.append(True)
            else:
                ans.append(False)
        return ans
