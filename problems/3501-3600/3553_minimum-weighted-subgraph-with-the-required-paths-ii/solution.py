from typing import List


class Solution:
    def minimumWeight(self, edges: List[List[int]], queries: List[List[int]]) -> List[int]:
        n = len(edges) + 1
        adj: List[List[tuple]] = [[] for _ in range(n)]
        for u, v, w in edges:
            adj[u].append((v, w))
            adj[v].append((u, w))

        # Root at 0; iterative DFS so deep chains cannot overflow the stack.
        depth = [0] * n
        dist = [0] * n
        parent = [0] * n
        seen = [False] * n
        seen[0] = True
        stack = [0]
        while stack:
            u = stack.pop()
            for v, w in adj[u]:
                if not seen[v]:
                    seen[v] = True
                    parent[v] = u
                    depth[v] = depth[u] + 1
                    dist[v] = dist[u] + w
                    stack.append(v)

        # Binary lifting: up[k][v] is the 2^k-th ancestor of v (root's is root).
        log = max(1, (n - 1).bit_length())
        up = [parent]
        for _ in range(1, log):
            prev = up[-1]
            up.append([prev[prev[v]] for v in range(n)])

        def lca(x: int, y: int) -> int:
            if depth[x] < depth[y]:
                x, y = y, x
            diff = depth[x] - depth[y]
            k = 0
            while diff:
                if diff & 1:
                    x = up[k][x]
                diff >>= 1
                k += 1
            if x == y:
                return x
            for k in range(log - 1, -1, -1):
                if up[k][x] != up[k][y]:
                    x = up[k][x]
                    y = up[k][y]
            return up[0][x]

        def distance(x: int, y: int) -> int:
            return dist[x] + dist[y] - 2 * dist[lca(x, y)]

        # The minimal subtree joining a, b, c is the union of the three paths,
        # each edge lying on exactly two of them.
        return [(distance(a, b) + distance(b, c) + distance(c, a)) // 2 for a, b, c in queries]
