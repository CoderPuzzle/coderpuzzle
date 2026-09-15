from typing import List, Optional

import heapq


class Solution:
    def minimumWeight(self, n: int, edges: List[List[int]], src1: int, src2: int, dest: int) -> int:
        def dijkstra(adj, src):
            INF = float("inf")
            dist = [INF] * n
            dist[src] = 0
            heap = [(0, src)]
            while heap:
                d, u = heapq.heappop(heap)
                if d > dist[u]:
                    continue  # lazy deletion: stale entry, a shorter path already won
                for v, w in adj[u]:
                    nd = d + w
                    if nd < dist[v]:
                        dist[v] = nd
                        heapq.heappush(heap, (nd, v))
            return dist

        adj = [[] for _ in range(n)]
        radj = [[] for _ in range(n)]
        for u, v, w in edges:
            adj[u].append((v, w))
            # reverse adjacency: a search from dest on radj gives dist(v, dest)
            radj[v].append((u, w))
        # optimal paths from src1 and src2 meet at some node v and share v->dest
        d1 = dijkstra(adj, src1)
        d2 = dijkstra(adj, src2)
        dd = dijkstra(radj, dest)
        # the shared v->dest segment is counted once: distances are computed
        # independently, so simply adding them absorbs the overlap
        best = min(
            (d1[v] + d2[v] + dd[v] for v in range(n) if dd[v] != float("inf")),
            default=-1,
        )
        # a reachable-from-dest node unreachable from a source still yields inf
        if best == float("inf"):
            return -1
        return best
