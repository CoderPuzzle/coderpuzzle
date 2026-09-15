from typing import List


class Solution:
    def constructGridLayout(self, n: int, edges: List[List[int]]) -> List[List[int]]:
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)

        # 1 x C (or R x 1) input: the graph is a path with two degree-1 ends.
        endpoint = next((v for v in range(n) if len(adj[v]) == 1), -1)
        if endpoint >= 0:
            placed = [False] * n
            row = [endpoint]
            placed[endpoint] = True
            while True:
                nxt = -1
                for u in adj[row[-1]]:
                    if not placed[u]:
                        nxt = u
                if nxt < 0:
                    return [row]
                row.append(nxt)
                placed[nxt] = True

        # Both dimensions >= 2: corners are exactly the degree-2 nodes, and
        # edges = 2n - (rows + cols), so rows + cols is known from n and E.
        corner = next(v for v in range(n) if len(adj[v]) == 2)
        dims_sum = 2 * n - len(edges)
        rows = cols = 0
        for t in range(1, dims_sum):
            if t * (dims_sum - t) == n:
                rows, cols = t, dims_sum - t
                break

        for first in adj[corner]:
            grid = self._build(adj, corner, first, rows, cols)
            if grid is not None:
                return grid
        return []

    def _build(self, adj, corner, first, rows, cols):
        placed = [False] * len(adj)
        row0 = [corner, first]
        placed[corner] = placed[first] = True
        while len(row0) < cols:
            w, p = row0[-1], row0[-2]
            nxt = -1
            for u in adj[w]:
                if placed[u] or u == p:
                    continue
                # A cell straight below shares a side-neighbor with p; the
                # next row cell shares none (w itself does not count -- it
                # neighbors both by construction).
                if any(z == x and z != w for z in adj[u] for x in adj[p]):
                    continue
                if nxt >= 0:
                    return None
                nxt = u
            if nxt < 0:
                return None
            row0.append(nxt)
            placed[nxt] = True

        grid = [row0]
        while len(grid) < rows:
            prev = grid[-1]
            start = -1
            for u in adj[prev[0]]:
                if not placed[u]:
                    if start >= 0:
                        return None
                    start = u
            if start < 0:
                return None
            new_row = [start]
            placed[start] = True
            for j in range(1, cols):
                hit = -1
                for u in adj[new_row[j - 1]]:
                    if not placed[u] and any(z == u for z in adj[prev[j]]):
                        if hit >= 0:
                            return None
                        hit = u
                if hit < 0:
                    return None
                new_row.append(hit)
                placed[hit] = True
            grid.append(new_row)

        if not all(placed):
            return None
        return grid
