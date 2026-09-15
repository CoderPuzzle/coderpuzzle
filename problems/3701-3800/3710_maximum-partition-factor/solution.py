from typing import List, Optional


class Solution:
    def maxPartitionFactor(self, points: List[List[int]]) -> int:
        n = len(points)
        # Both groups are singletons, so no intra-group pair exists and the
        # factor is 0 by definition.
        if n == 2:
            return 0
        dist = [[abs(a[0] - b[0]) + abs(a[1] - b[1]) for b in points] for a in points]
        # The factor of any split is 0 or one of the inter-point distances,
        # so binary search probes those candidate thresholds only.
        candidates = sorted({0} | {dist[u][v] for u in range(n) for v in range(u + 1, n)})

        def separable(limit: int) -> bool:
            # Every pair closer than limit must be split across the two
            # groups -- exactly "the conflict graph is bipartite".
            adj = [[v for v in range(n) if v != u and dist[u][v] < limit] for u in range(n)]
            color = [-1] * n
            for start in range(n):
                if color[start] != -1:
                    continue
                color[start] = 0
                stack = [start]
                while stack:
                    u = stack.pop()
                    cu, neighbours = color[u], adj[u]
                    for v in neighbours:
                        if color[v] == -1:
                            color[v] = cu ^ 1
                            stack.append(v)
                        elif color[v] == cu:
                            return False
            return True

        # Raising the threshold only adds conflict edges, so feasibility is
        # monotone and the largest separable threshold is the answer.
        lo, hi = 0, len(candidates) - 1
        while lo < hi:
            mid = (lo + hi + 1) // 2
            if separable(candidates[mid]):
                lo = mid
            else:
                hi = mid - 1
        return candidates[lo]
