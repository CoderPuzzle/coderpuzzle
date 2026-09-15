from collections import deque


class Solution:
    def maximumSafenessFactor(self, grid: list[list[int]]) -> int:
        n = len(grid)
        # Multi-source BFS from every hazard at once: wavefront exploration
        # makes dist[r][c] the minimum grid steps to the nearest hazard —
        # exactly the cell's clearance value.
        dist = [[-1] * n for _ in range(n)]
        q = deque()
        for r in range(n):
            for c in range(n):
                if grid[r][c] == 1:
                    dist[r][c] = 0
                    q.append((r, c))
        dirs = ((1, 0), (-1, 0), (0, 1), (0, -1))
        while q:
            r, c = q.popleft()
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if 0 <= nr < n and 0 <= nc < n and dist[nr][nc] == -1:
                    dist[nr][nc] = dist[r][c] + 1
                    q.append((nr, nc))

        # Kruskal-style flood: admit cells in descending clearance, uniting
        # each with its already-admitted 4-neighbors, and watch the corners.
        # Their union traces a real all-admitted path, so it can only happen
        # at a clearance the answer reaches — and the best route's bottleneck
        # cell closes it exactly, making the value being admitted the answer.
        parent = list(range(n * n))
        size = [1] * (n * n)

        def find(x):
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        cells = sorted(
            ((dist[r][c], r, c) for r in range(n) for c in range(n)),
            reverse=True,
        )
        admitted = [[False] * n for _ in range(n)]
        for v, r, c in cells:
            admitted[r][c] = True
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if 0 <= nr < n and 0 <= nc < n and admitted[nr][nc]:
                    a, b = find(r * n + c), find(nr * n + nc)
                    if a != b:
                        if size[a] < size[b]:
                            a, b = b, a
                        parent[b] = a
                        size[a] += size[b]
            if find(0) == find(n * n - 1):
                return v
        # The whole grid admits in the end, so the corners always unite; 0
        # is just the fallback.
        return 0
