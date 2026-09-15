from typing import List, Optional


class Solution:
    def maximumCost(self, n: int, highways: List[List[int]], k: int) -> int:
        # A trip crossing exactly k highways visits k+1 distinct cities.
        if k + 1 > n:
            return -1
        adj = [[] for _ in range(n)]
        for a, b, toll in highways:
            adj[a].append((b, toll))
            adj[b].append((a, toll))
        NEG = float("-inf")
        dp = [[NEG] * n for _ in range(1 << n)]
        for v in range(n):
            dp[1 << v][v] = 0
        best = -1
        for mask in range(1 << n):
            pc = bin(mask).count("1")
            if pc > k + 1:
                continue
            for v in range(n):
                cur = dp[mask][v]
                if cur == NEG:
                    continue
                if pc == k + 1:
                    if cur > best:
                        best = cur
                    continue
                for u, toll in adj[v]:
                    if not mask & (1 << u):
                        nxt = cur + toll
                        nm = mask | (1 << u)
                        if nxt > dp[nm][u]:
                            dp[nm][u] = nxt
        return best
