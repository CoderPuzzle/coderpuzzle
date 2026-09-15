from typing import List, Optional


class Solution:
    def minCost(self, n: int, edges: List[List[int]], k: int) -> int:
        from collections import deque

        adj = [[] for _ in range(n)]
        max_w = 0
        for u, v, w in edges:
            adj[u].append((v, w))
            adj[v].append((u, w))
            if w > max_w:
                max_w = w

        # Budget `money` repairs exactly the edges with w <= money, so raising
        # money only adds usable edges: feasibility is monotone and the answer
        # is binary-searchable.
        def can(money):
            dist = [-1] * n
            dist[0] = 0
            queue = deque([0])
            # BFS explores level by level, so dist[v] is the fewest edges over
            # available paths; nodes already at k edges are never expanded.
            while queue:
                u = queue.popleft()
                if dist[u] >= k:
                    continue
                for v, w in adj[u]:
                    if w <= money and dist[v] == -1:
                        dist[v] = dist[u] + 1
                        queue.append(v)
            return dist[n - 1] != -1 and dist[n - 1] <= k

        # If even repairing every edge fails (target unreachable, or every
        # path longer than k), there is no answer; otherwise can(hi) always
        # holds and the loop converges on the smallest feasible amount.
        if not can(max_w):
            return -1
        lo, hi = 0, max_w
        while lo < hi:
            mid = (lo + hi) // 2
            if can(mid):
                hi = mid
            else:
                lo = mid + 1
        return lo
