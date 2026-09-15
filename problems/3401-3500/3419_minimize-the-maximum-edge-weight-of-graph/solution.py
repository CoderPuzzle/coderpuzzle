from typing import List, Optional


class Solution:
    def minMaxWeight(self, n: int, edges: List[List[int]], threshold: int) -> int:
        adj = [[] for _ in range(n)]
        maxw = 0
        for u, v, w in edges:
            # Invert: "0 reachable from all" becomes "0 reaches all" in rev.
            adj[v].append((u, w))
            if w > maxw:
                maxw = w

        def reachable(limit):
            seen = [False] * n
            seen[0] = True
            stack = [0]
            count = 1
            while stack:
                x = stack.pop()
                for nxt, w in adj[x]:
                    if not seen[nxt] and w <= limit:
                        seen[nxt] = True
                        count += 1
                        stack.append(nxt)
            return count == n

        if not reachable(maxw):
            return -1
        lo, hi = 0, maxw
        while lo < hi:
            mid = (lo + hi) // 2
            if reachable(mid):
                hi = mid
            else:
                lo = mid + 1
        return lo
