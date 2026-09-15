from typing import List, Optional


class Solution:
    def sumOfDistancesInTree(self, n: int, edges: List[List[int]]) -> List[int]:
        adj = [[] for _ in range(n)]
        for a, b in edges:
            adj[a].append(b)
            adj[b].append(a)

        # Iterative DFS from node 0: parents and a top-down visit order.
        parent = [-1] * n
        order = [0]
        seen = [False] * n
        seen[0] = True
        head = 0
        while head < len(order):
            u = order[head]
            head += 1
            for v in adj[u]:
                if not seen[v]:
                    seen[v] = True
                    parent[v] = u
                    order.append(v)

        sub = [1] * n
        dist = [0] * n
        # Bottom-up pass: dist[u] = sum over children of (dist[v] + sub[v]).
        for u in reversed(order):
            for v in adj[u]:
                if v == parent[u]:
                    continue
                sub[u] += sub[v]
                dist[u] += dist[v] + sub[v]

        ans = [0] * n
        ans[0] = dist[0]
        # Top-down re-rooting pass.
        for u in order:
            for v in adj[u]:
                if v == parent[u]:
                    continue
                ans[v] = ans[u] - sub[v] + (n - sub[v])
        return ans
