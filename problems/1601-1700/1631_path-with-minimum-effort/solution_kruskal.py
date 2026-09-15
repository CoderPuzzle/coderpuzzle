from typing import List, Optional


class Solution:
    def minimumEffortPath(self, heights: List[List[int]]) -> int:
        rows, cols = len(heights), len(heights[0])
        # One edge per adjacent pair (right and down neighbor), endpoints
        # flattened to r*cols + c.
        edges = []
        for r in range(rows):
            for c in range(cols):
                if c + 1 < cols:
                    edges.append(
                        (
                            abs(heights[r][c + 1] - heights[r][c]),
                            r * cols + c,
                            r * cols + c + 1,
                        )
                    )
                if r + 1 < rows:
                    edges.append(
                        (
                            abs(heights[r + 1][c] - heights[r][c]),
                            r * cols + c,
                            (r + 1) * cols + c,
                        )
                    )
        # Ascending weight order is Kruskal's skeleton: the first edge that
        # joins the two corners is the minimum possible maximum.
        edges.sort()
        parent = list(range(rows * cols))
        size = [1] * (rows * cols)

        def find(x):
            # Path compression keeps later finds near O(1).
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        def union(a, b):
            ra, rb = find(a), find(b)
            if ra == rb:
                return
            # Union by size keeps the trees shallow.
            if size[ra] < size[rb]:
                ra, rb = rb, ra
            parent[rb] = ra
            size[ra] += size[rb]

        target = rows * cols - 1
        # A 1x1 grid is connected to itself from the start.
        if find(0) == find(target):
            return 0
        for w, a, b in edges:
            if find(a) == find(b):
                continue
            union(a, b)
            # Once both corners share a component, every path between them
            # uses some edge of weight at least w, and w already suffices.
            if find(0) == find(target):
                return w
        return 0
