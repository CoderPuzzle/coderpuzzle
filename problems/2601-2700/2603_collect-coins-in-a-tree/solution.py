from typing import List, Optional


class Solution:
    def collectTheCoins(self, coins: List[int], edges: List[List[int]]) -> int:
        n = len(coins)
        adj = [set() for _ in range(n)]
        for a, b in edges:
            adj[a].add(b)
            adj[b].add(a)

        # Phase 1: repeatedly remove leaves that carry no coin.
        leaves = [i for i in range(n) if len(adj[i]) == 1 and coins[i] == 0]
        while leaves:
            nxt = []
            for u in leaves:
                if adj[u]:
                    v = next(iter(adj[u]))
                    adj[v].discard(u)
                    if len(adj[v]) == 1 and coins[v] == 0:
                        nxt.append(v)
                adj[u].clear()
            leaves = nxt

        # Phase 2: drop two more layers of leaves (distance-2 collection).
        for _ in range(2):
            leaves = [i for i in range(n) if len(adj[i]) == 1]
            for u in leaves:
                if adj[u]:
                    v = next(iter(adj[u]))
                    adj[v].discard(u)
                adj[u].clear()

        remaining = sum(1 for i in range(n) if adj[i])
        return max(0, (remaining - 1) * 2)
