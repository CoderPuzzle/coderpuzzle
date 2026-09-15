from typing import List, Optional


class Solution:
    def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
        INF = 10**8
        dist = [INF] * (n + 1)
        dist[k] = 0
        # Each round extends shortest paths by one edge, so n-1 rounds suffice.
        for _ in range(n - 1):
            changed = False
            for u, v, w in times:
                if dist[u] < INF and dist[u] + w < dist[v]:
                    dist[v] = dist[u] + w
                    changed = True
            # A round that relaxes nothing means the distances are final.
            if not changed:
                break
        best = 0
        for i in range(1, n + 1):
            # Anything still at INF is unreachable from k.
            if dist[i] >= INF:
                return -1
            best = max(best, dist[i])
        return best
