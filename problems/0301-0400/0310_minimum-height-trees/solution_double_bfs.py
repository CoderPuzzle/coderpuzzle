from collections import deque


class Solution:
    def findMinHeightTrees(self, n: int, edges: list[list[int]]) -> list[int]:
        adjacency = [[] for _ in range(n)]
        for a, b in edges:
            adjacency[a].append(b)
            adjacency[b].append(a)

        # One BFS from src: returns the farthest node from src, the distance
        # of every node, and the parent each node was discovered through.
        def farthest_from(src):
            dist = [-1] * n
            parent = [-1] * n
            dist[src] = 0
            queue = deque([src])
            while queue:
                u = queue.popleft()
                for v in adjacency[u]:
                    if dist[v] < 0:
                        dist[v] = dist[u] + 1
                        parent[v] = u
                        queue.append(v)
            best = 0
            for i in range(1, n):
                if dist[i] > dist[best]:
                    best = i
            return best, dist, parent

        # Two-shot diameter: the farthest node from any start is one end of
        # a longest path, and the farthest node from there is the other end.
        u, _, _ = farthest_from(0)
        v, dist, parent = farthest_from(u)
        # Climb v back to u along discovery parents: the diameter path.
        path = []
        x = v
        while x != -1:
            path.append(x)
            x = parent[x]
        # The minimal-height roots are the path's middle: one node when the
        # diameter has an even number of edges, two adjacent middles when odd.
        d = dist[v]
        if d % 2 == 0:
            return [path[d // 2]]
        a, b = path[d // 2], path[d // 2 + 1]
        return [a, b] if a < b else [b, a]
