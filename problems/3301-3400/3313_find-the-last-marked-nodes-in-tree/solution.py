from typing import List


class Solution:
    def lastMarkedNodes(self, edges: List[List[int]]) -> List[int]:
        # Marking spreads one BFS layer per second, so the last marked node
        # for a start i is a farthest node from i, and a farthest node from
        # any node is always an endpoint of a diameter. Two sweeps find the
        # diameter endpoints u and v; the distance arrays from both then
        # answer every i at once — the farther endpoint is a last-marked
        # node, and on a tie either endpoint qualifies.
        n = len(edges) + 1
        adj = [[] for _ in range(n)]
        for a, b in edges:
            adj[a].append(b)
            adj[b].append(a)

        def bfs(src):
            dist = [-1] * n
            dist[src] = 0
            queue = [src]
            far = src
            for node in queue:
                for nxt in adj[node]:
                    if dist[nxt] == -1:
                        dist[nxt] = dist[node] + 1
                        if dist[nxt] > dist[far]:
                            far = nxt
                        queue.append(nxt)
            return dist, far

        _, u = bfs(0)
        dist_u, v = bfs(u)
        dist_v, _ = bfs(v)
        return [u if dist_u[i] > dist_v[i] else v for i in range(n)]
