from typing import List


class Solution:
    def minTrioDegree(self, n: int, edges: List[List[int]]) -> int:
        # A trio's degree is deg(u) + deg(v) + deg(w) - 6: the three
        # internal edges are exactly the ones double-counted by vertex
        # degrees. Rank the nodes by (degree, id) and keep each node's
        # neighbors as a bitset over those ranks; the cheapest trio
        # through an edge (u, v) uses the minimum-degree common
        # neighbor, which is the lowest set bit of mask[u] & mask[v].
        deg = [0] * (n + 1)
        for u, v in edges:
            deg[u] += 1
            deg[v] += 1

        order = sorted(range(1, n + 1), key=lambda x: (deg[x], x))
        rank = [0] * (n + 1)
        deg_at = [0] * n
        for p, node in enumerate(order):
            rank[node] = p
            deg_at[p] = deg[node]

        mask = [0] * (n + 1)
        for u, v in edges:
            mask[u] |= 1 << rank[v]
            mask[v] |= 1 << rank[u]

        best = 3 * n
        for u, v in edges:
            common = mask[u] & mask[v]
            if common:
                p = (common & -common).bit_length() - 1
                cand = deg[u] + deg[v] + deg_at[p] - 6
                if cand < best:
                    best = cand
        return best if best < 3 * n else -1
