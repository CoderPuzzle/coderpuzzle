from typing import List, Optional


class Solution:
    def findSpecialNodes(self, n: int, edges: List[List[int]]) -> str:
        adj = [[] for _ in range(n)]
        for a, b in edges:
            adj[a].append(b)
            adj[b].append(a)

        # Classic property: every node tying as farthest from src is the
        # endpoint of some diameter path, so the sweep returns the whole
        # farthest set, ties included.
        def bfs(src):
            dist = [-1] * n
            dist[src] = 0
            queue = [src]
            head = 0
            far = 0
            while head < len(queue):
                u = queue[head]
                head += 1
                for v in adj[u]:
                    if dist[v] == -1:
                        dist[v] = dist[u] + 1
                        if dist[v] > far:
                            far = dist[v]
                        queue.append(v)
            return {i for i in range(n) if dist[i] == far}

        # First sweep from node 0: one side's diameter endpoints. Rerun from
        # any member of that set: it is itself an endpoint, so nodes at the
        # new maximum distance are the opposite endpoints.
        one_end = bfs(0)
        other_end = bfs(next(iter(one_end)))
        # The union of the two endpoint sets is exactly the special nodes.
        special = one_end | other_end
        return "".join("1" if i in special else "0" for i in range(n))
