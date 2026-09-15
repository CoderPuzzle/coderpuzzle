from typing import List, Optional


class Solution:
    def hitBricks(self, grid: List[List[int]], hits: List[List[int]]) -> List[int]:
        m, n = len(grid), len(grid[0])
        top = m * n
        parent = list(range(top + 1))
        size = [1] * (top + 1)
        size[top] = 0

        def find(x):
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        def union(a, b):
            ra, rb = find(a), find(b)
            if ra == rb:
                return
            if size[ra] < size[rb]:
                ra, rb = rb, ra
            parent[rb] = ra
            size[ra] += size[rb]

        def idx(r, c):
            return r * n + c

        # Final grid after all hits are applied.
        g = [row[:] for row in grid]
        for r, c in hits:
            g[r][c] = 0

        dirs = ((-1, 0), (1, 0), (0, -1), (0, 1))

        # Union all remaining bricks with each other and with the virtual top.
        for r in range(m):
            for c in range(n):
                if g[r][c] == 1:
                    if r == 0:
                        union(idx(r, c), top)
                    if r + 1 < m and g[r + 1][c] == 1:
                        union(idx(r, c), idx(r + 1, c))
                    if c + 1 < n and g[r][c + 1] == 1:
                        union(idx(r, c), idx(r, c + 1))

        res = [0] * len(hits)
        for k in range(len(hits) - 1, -1, -1):
            r, c = hits[k]
            if grid[r][c] != 1:
                continue
            before = size[find(top)]
            g[r][c] = 1
            if r == 0:
                union(idx(r, c), top)
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and g[nr][nc] == 1:
                    union(idx(r, c), idx(nr, nc))
            after = size[find(top)]
            res[k] = max(0, after - before - 1)
        return res
