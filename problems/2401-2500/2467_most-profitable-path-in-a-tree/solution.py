from collections import deque
from typing import List, Optional


class Solution:
    def mostProfitablePath(self, edges: List[List[int]], bob: int, amount: List[int]) -> int:
        n = len(amount)
        adj = [[] for _ in range(n)]
        for a, b in edges:
            adj[a].append(b)
            adj[b].append(a)

        # One BFS from the root orients the tree: depth[u] is Alice's
        # arrival time, and order lists every node after its parent.
        parent = [-1] * n
        depth = [0] * n
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
                    depth[v] = depth[u] + 1
                    queue.append(v)

        # Bob has no choices: walk his unique path to the root, recording
        # his arrival time at each node along it.
        bob_time = {}
        t = 0
        node = bob
        while node != -1:
            bob_time[node] = t
            t += 1
            node = parent[node]

        # BFS order makes income[parent] final before u, so each root-to-node
        # path sum builds in one sweep. gain compares arrivals: Bob later or
        # absent -> full amount; simultaneous -> half (exact: amounts are
        # even); Bob earlier -> gate already open, 0.
        income = [0] * n
        best = None
        for u in order:
            d = depth[u]
            bt = bob_time.get(u)
            if bt is None or bt > d:
                gain = amount[u]
            elif bt == d:
                gain = amount[u] // 2
            else:
                gain = 0
            income[u] = (income[parent[u]] if u else 0) + gain
            # Alice must keep moving, so she stops at a leaf: a non-root
            # node with exactly one neighbor.
            if u != 0 and len(adj[u]) == 1:
                best = income[u] if best is None else max(best, income[u])
        return best
