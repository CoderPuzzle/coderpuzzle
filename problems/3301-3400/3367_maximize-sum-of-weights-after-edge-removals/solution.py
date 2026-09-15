from typing import List, Optional


class Solution:
    def maximizeSumOfWeights(self, edges: List[List[int]], k: int) -> int:
        n = 0
        for u, v, w in edges:
            n = max(n, u, v)
        n += 1
        adj = [[] for _ in range(n)]
        for u, v, w in edges:
            adj[u].append((v, w))
            adj[v].append((u, w))

        parent = [-1] * n
        order = []
        parent[0] = 0
        stack = [0]
        while stack:
            u = stack.pop()
            order.append(u)
            for v, w in adj[u]:
                if v == parent[u]:
                    continue
                parent[v] = u
                stack.append(v)

        # g[u]: best subtree sum when the edge to u's parent is NOT kept.
        # f[u]: best subtree sum when the edge to u's parent IS kept.
        g = [0] * n
        f = [0] * n
        for u in reversed(order):
            total = 0
            gains = []
            for v, w in adj[u]:
                if parent[v] == u:
                    total += g[v]
                    gains.append(w + f[v] - g[v])
            gains.sort(reverse=True)
            take = min(k, len(gains))
            take1 = min(k - 1, len(gains))
            s0 = total
            s1 = total
            for i in range(take):
                if gains[i] > 0:
                    s0 += gains[i]
            for i in range(take1):
                if gains[i] > 0:
                    s1 += gains[i]
            g[u] = s0
            f[u] = s1
        return g[0]
