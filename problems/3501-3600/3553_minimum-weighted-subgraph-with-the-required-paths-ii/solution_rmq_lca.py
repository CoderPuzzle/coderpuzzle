class Solution:
    def minimumWeight(self, edges: list[list[int]], queries: list[list[int]]) -> list[int]:
        n = len(edges) + 1
        adj: list[list[tuple]] = [[] for _ in range(n)]
        for u, v, w in edges:
            adj[u].append((v, w))
            adj[v].append((u, w))

        # Root at 0 and walk an Euler tour iteratively, so deep chains cannot
        # overflow the stack. Every node enters the tour at its first visit and
        # re-enters each time a child's subtree closes, giving 2n - 1 entries;
        # first[v] is v's earliest slot in that sequence.
        depth = [0] * n
        dist = [0] * n
        parent = [-1] * n
        first = [0] * n
        it = [0] * n
        tour = [0]
        stack = [0]
        while stack:
            u = stack[-1]
            if it[u] < len(adj[u]):
                v, w = adj[u][it[u]]
                it[u] += 1
                if v != parent[u]:
                    parent[v] = u
                    depth[v] = depth[u] + 1
                    dist[v] = dist[u] + w
                    first[v] = len(tour)
                    tour.append(v)
                    stack.append(v)
            else:
                stack.pop()
                if stack:
                    tour.append(stack[-1])

        # Sparse table: table[k][i] is the shallowest node over the 2^k tour
        # entries from i - the range argmin under depth comparison.
        m = len(tour)
        table = [tour]
        for k in range(1, m.bit_length()):
            prev = table[k - 1]
            half = 1 << (k - 1)
            table.append([a if depth[a] <= depth[b] else b for a, b in zip(prev, prev[half:])])

        def lca(x: int, y: int) -> int:
            l, r = first[x], first[y]
            if l > r:
                l, r = r, l
            k = (r - l + 1).bit_length() - 1
            left, right = table[k][l], table[k][r - (1 << k) + 1]
            return left if depth[left] <= depth[right] else right

        def distance(x: int, y: int) -> int:
            return dist[x] + dist[y] - 2 * dist[lca(x, y)]

        # The minimal subtree joining a, b, c is the union of the three paths,
        # each edge lying on exactly two of them.
        return [(distance(a, b) + distance(b, c) + distance(c, a)) // 2 for a, b, c in queries]
