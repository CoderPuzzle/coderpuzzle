class Solution:
    def maximumMinimumPath(self, grid: list[list[int]]) -> int:
        rows, cols = len(grid), len(grid[0])
        # Kruskal-style admission: switch cells on biggest-first and stop the
        # moment the two corners join one admitted component -- the value of
        # the cell admitted last is the widest bottleneck any walk can hold.
        cells = sorted(((grid[r][c], r, c) for r in range(rows) for c in range(cols)), reverse=True)
        total = rows * cols
        # parent[i] is -1 while cell i is unadmitted, else its union-find parent.
        parent = [-1] * total

        def find(i: int) -> int:
            # An unadmitted cell is its own isolated root.
            if parent[i] == -1:
                return i
            while parent[i] != i:
                # Path halving keeps every later walk nearly flat.
                parent[i] = parent[parent[i]]
                i = parent[i]
            return i

        for value, r, c in cells:
            idx = r * cols + c
            # Admit the cell: it becomes its own root, then merges with every
            # already-admitted neighbour.
            parent[idx] = idx
            for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols and parent[nr * cols + nc] != -1:
                    ra, rb = find(idx), find(nr * cols + nc)
                    if ra != rb:
                        parent[ra] = rb
            if find(0) == find(total - 1):
                return value
        # The full grid is connected, so the loop always returns inside.
        return 0
