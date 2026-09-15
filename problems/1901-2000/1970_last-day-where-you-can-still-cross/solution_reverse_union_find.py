class Solution:
    def latestDayToCross(self, row: int, col: int, cells: list[list[int]]) -> int:
        n = row * col
        top, bottom = n, n + 1  # virtual sentinels: one node per shore
        parent = list(range(n + 2))
        size = [1] * (n + 2)
        active = [[False] * col for _ in range(row)]

        def find(x):
            # Path halving keeps the trees flat without a second pass.
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        def union(a, b):
            root_a, root_b = find(a), find(b)
            if root_a == root_b:
                return
            # Union by size: hang the smaller tree under the larger.
            if size[root_a] < size[root_b]:
                root_a, root_b = root_b, root_a
            parent[root_b] = root_a
            size[root_a] += size[root_b]

        # Walk the days backwards: one cell of land reappears per step, so
        # connectivity only grows. After absorbing cells[i] the grid state is
        # exactly "day i" (cells[:i] still flooded), so the first moment the
        # shores share a root, day i is the last crossable day.
        for i in range(n - 1, -1, -1):
            r, c = cells[i][0] - 1, cells[i][1] - 1
            active[r][c] = True
            land = r * col + c
            if r == 0:
                union(land, top)
            if r == row - 1:
                union(land, bottom)
            for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < row and 0 <= nc < col and active[nr][nc]:
                    union(land, nr * col + nc)
            if find(top) == find(bottom):
                return i  # the shores just met: no later day can cross
        return 0  # unreachable: with row, col >= 2 even day 1 always crosses
