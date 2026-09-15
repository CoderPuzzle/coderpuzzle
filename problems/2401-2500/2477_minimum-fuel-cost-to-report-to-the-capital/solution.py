from collections import deque
from typing import List, Optional


class Solution:
    def minimumFuelCost(self, roads: List[List[int]], seats: int) -> int:
        n = len(roads) + 1
        if n == 1:
            return 0
        adj = [[] for _ in range(n)]
        for a, b in roads:
            adj[a].append(b)
            adj[b].append(a)

        parent = [-1] * n
        seen = [False] * n
        seen[0] = True
        order = []
        queue = deque([0])
        while queue:
            u = queue.popleft()
            order.append(u)
            for v in adj[u]:
                if not seen[v]:
                    seen[v] = True
                    parent[v] = u
                    queue.append(v)

        size = [1] * n
        fuel = 0
        for u in reversed(order):  # children before parents
            if u == 0:
                continue
            size[parent[u]] += size[u]
            fuel += (size[u] + seats - 1) // seats
        return fuel
