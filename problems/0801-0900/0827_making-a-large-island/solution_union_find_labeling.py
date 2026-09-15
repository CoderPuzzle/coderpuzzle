class Solution:
    def largestIsland(self, grid: list[list[int]]) -> int:
        n = len(grid)
        cells = n * n
        # Disjoint-set forest over the cells: parent[i*n+j] points at the
        # cell's current representative, and size is maintained per
        # representative only. Union by size plus path compression keeps
        # the trees nearly flat.
        parent = list(range(cells))
        size = [1] * cells

        def find(x):
            root = x
            while parent[root] != root:
                root = parent[root]
            while parent[x] != root:
                parent[x], x = root, parent[x]
            return root

        def unite(a, b):
            a = find(a)
            b = find(b)
            if a == b:
                return
            if size[a] < size[b]:
                a, b = b, a
            parent[b] = a
            size[a] += size[b]

        # One row-major pass: each 1-cell joins the (already processed)
        # 1-cell to its left and the one above, so every island is
        # assembled edge by edge and no traversal stack is needed.
        for i in range(n):
            for j in range(n):
                if grid[i][j] == 1:
                    idx = i * n + j
                    if j > 0 and grid[i][j - 1] == 1:
                        unite(idx, idx - 1)
                    if i > 0 and grid[i - 1][j] == 1:
                        unite(idx, idx - n)

        # Best starts at the largest existing island — also the answer
        # when the grid is all 1s and no 0 exists to flip.
        best = 0
        for i in range(n):
            for j in range(n):
                if grid[i][j] == 1:
                    s = size[find(i * n + j)]
                    if s > best:
                        best = s
        for i in range(n):
            for j in range(n):
                if grid[i][j] == 0:
                    # Dedup matters: one island can touch this 0 on
                    # several sides, and counting it twice would
                    # overstate the merge. The dedup key is the root.
                    seen = set()
                    for di, dj in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                        ni, nj = i + di, j + dj
                        if 0 <= ni < n and 0 <= nj < n and grid[ni][nj] == 1:
                            seen.add(find(ni * n + nj))
                    # Flipping this 0 merges it with the distinct
                    # neighboring islands.
                    best = max(best, 1 + sum(size[root] for root in seen))
        return best
