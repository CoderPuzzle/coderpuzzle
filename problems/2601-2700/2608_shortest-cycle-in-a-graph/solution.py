from typing import List


class Solution:
    def findShortestCycle(self, n: int, edges: List[List[int]]) -> int:
        # Per hint: BFS from every vertex. Distances label the BFS tree rooted
        # at the source, and any non-tree edge (u, v) then closes a cycle of
        # dist[u] + dist[v] + 1 whose walks run through the root's levels, so
        # some cycle is measured by its own vertices and the global minimum
        # over all roots is exact.
        adj = [[] for _ in range(n)]
        for a, b in edges:
            adj[a].append(b)
            adj[b].append(a)
        best = -1
        dist = [-1] * n
        parent = [-1] * n
        for start in range(n):
            dist[start] = 0
            queue = [start]
            head = 0
            while head < len(queue):
                u = queue[head]
                head += 1
                for v in adj[u]:
                    if dist[v] == -1:
                        dist[v] = dist[u] + 1
                        parent[v] = u
                        queue.append(v)
                    elif parent[u] != v and parent[v] != u:
                        # Tree edges would double-count one path instead of
                        # closing a ring, so only genuine cross links count.
                        length = dist[u] + dist[v] + 1
                        if best == -1 or length < best:
                            best = length
            # Reset just the vertices this search reached.
            for v in queue:
                dist[v] = -1
                parent[v] = -1
        return best
