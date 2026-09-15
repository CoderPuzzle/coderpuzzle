import heapq


class Solution:
    def minCost(self, grid: list[list[int]]) -> int:
        m, n = len(grid), len(grid[0])
        # Shortest path over cells: each move costs 0 when the cell's sign
        # points at that neighbor and 1 otherwise (the price of rewriting it).
        # Plain Dijkstra: a binary heap yields the smallest tentative distance
        # on every pop, whatever the weights are.
        dirs = {1: (0, 1), 2: (0, -1), 3: (1, 0), 4: (-1, 0)}
        dist = [[float("inf")] * n for _ in range(m)]
        dist[0][0] = 0
        heap = [(0, 0, 0)]
        while heap:
            d, i, j = heapq.heappop(heap)
            # The first pop of a cell settles its distance for good.
            if i == m - 1 and j == n - 1:
                return d
            # Stale-entry guard: skip outdated heap records.
            if d > dist[i][j]:
                continue
            for sign, (di, dj) in dirs.items():
                ni, nj = i + di, j + dj
                # Bounds check drops signs pointing off the grid.
                if 0 <= ni < m and 0 <= nj < n:
                    cost = 0 if grid[i][j] == sign else 1
                    # Relax only when the rewrite price strictly improves.
                    if d + cost < dist[ni][nj]:
                        dist[ni][nj] = d + cost
                        heapq.heappush(heap, (d + cost, ni, nj))
        return dist[m - 1][n - 1]
