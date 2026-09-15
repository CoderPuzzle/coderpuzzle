from typing import List


class Solution:
    def regionsBySlashes(self, grid: List[str]) -> int:
        # Cut the square into four triangles per cell — top, right, bottom,
        # left — and let an iterative union-find glue them together: the
        # cell's own marking joins triangles inside the cell, and shared
        # edges join triangles across cell borders. Each surviving set is
        # exactly one region, so the answer is the number of distinct roots
        # among the 4*n*n triangles. Nothing recurses — find walks parent
        # links and compresses the walked path in loops.
        n = len(grid)
        parent = list(range(4 * n * n))

        def find(x: int) -> int:
            root = x
            while parent[root] != root:
                root = parent[root]
            while parent[x] != root:
                parent[x], x = root, parent[x]
            return root

        def union(a: int, b: int) -> None:
            ra, rb = find(a), find(b)
            if ra != rb:
                parent[ra] = rb

        for i in range(n):
            for j in range(n):
                base = 4 * (i * n + j)
                ch = grid[i][j]
                # '/' joins top with left and right with bottom, '\' joins
                # top with right and bottom with left, a blank joins all.
                if ch == " ":
                    union(base, base + 1)
                    union(base + 1, base + 2)
                    union(base + 2, base + 3)
                elif ch == "/":
                    union(base, base + 3)
                    union(base + 1, base + 2)
                else:
                    union(base, base + 1)
                    union(base + 2, base + 3)
                # The bottom triangle shares its open edge with the cell
                # below's top triangle; the right triangle with the right
                # neighbor's left triangle.
                if i + 1 < n:
                    union(base + 2, base + 4 * n)
                if j + 1 < n:
                    union(base + 1, base + 4 + 3)
        # Roots are exactly the self-parented nodes, so counting those
        # counts regions.
        regions = 0
        for x in range(4 * n * n):
            if parent[x] == x:
                regions += 1
        return regions
