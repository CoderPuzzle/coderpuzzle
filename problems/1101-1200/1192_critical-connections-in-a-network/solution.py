from typing import List, Optional


class Solution:
    def criticalConnections(self, n: int, connections: List[List[int]]) -> List[List[int]]:
        graph = [[] for _ in range(n)]
        for a, b in connections:
            graph[a].append(b)
            graph[b].append(a)

        # Tarjan bridge finding: disc[u] is the DFS discovery time, low[u] the
        # earliest discovery reachable from u's subtree using tree edges plus
        # at most one back edge
        disc = [-1] * n
        low = [0] * n
        timer = 0
        bridges = []

        def dfs(u, parent):
            nonlocal timer
            disc[u] = low[u] = timer
            timer += 1
            for v in graph[u]:
                if disc[v] == -1:
                    dfs(v, u)
                    # fold the child's reach upward
                    low[u] = min(low[u], low[v])
                    # bridge iff v's subtree cannot see past u: this tree
                    # edge is the only route between the two sides
                    if low[v] > disc[u]:
                        bridges.append([min(u, v), max(u, v)])
                elif v != parent:
                    # back edge to a non-parent ancestor relaxes low; skipping
                    # the parent matters — that edge is the tree edge itself
                    low[u] = min(low[u], disc[v])

        # graph is connected, so one root reaches every server
        dfs(0, -1)
        # sort only for a deterministic output order
        bridges.sort()
        return bridges
