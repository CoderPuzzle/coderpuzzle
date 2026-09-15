from typing import List, Optional


class Solution:
    def maxKDivisibleComponents(self, n: int, edges: List[List[int]], values: List[int], k: int) -> int:
        adj = [[] for _ in range(n)]
        for a, b in edges:
            adj[a].append(b)
            adj[b].append(a)

        # Iterative DFS from root 0 to get a processing order (parents first).
        parent = [-1] * n
        order = []
        stack = [0]
        visited = [False] * n
        visited[0] = True
        while stack:
            u = stack.pop()
            order.append(u)
            for v in adj[u]:
                if not visited[v]:
                    visited[v] = True
                    parent[v] = u
                    stack.append(v)

        # Process children before parents; cut an edge whenever the finished
        # subtree sum is divisible by k.
        subtree = list(values)
        components = 0
        for u in reversed(order):
            if u != 0:
                if subtree[u] % k == 0:
                    components += 1
                else:
                    subtree[parent[u]] += subtree[u]
        return components + 1
