class Solution:
    def maxDistance(self, grid: list[list[int]]) -> int:
        n = len(grid)
        # distance field: land starts at 0, water at a sentinel standing in
        # for infinity; any value above the largest possible distance
        # (2n - 2) is safe, and n * n is a convenient pick
        inf = n * n
        dist = [[inf] * n for _ in range(n)]
        has_land = False
        has_water = False
        for i in range(n):
            for j in range(n):
                if grid[i][j] == 1:
                    dist[i][j] = 0
                    has_land = True
                else:
                    has_water = True
        # all water (nothing to measure from) or all land (nothing to measure)
        if not has_land or not has_water:
            return -1
        # two-pass DP, first sweep: top-left to bottom-right, so every cell
        # relaxes against its up and left neighbors plus one step
        for i in range(n):
            for j in range(n):
                if i > 0 and dist[i - 1][j] + 1 < dist[i][j]:
                    dist[i][j] = dist[i - 1][j] + 1
                if j > 0 and dist[i][j - 1] + 1 < dist[i][j]:
                    dist[i][j] = dist[i][j - 1] + 1
        # second sweep: bottom-right to top-left, covering down and right;
        # the four directions together span every Manhattan path
        best = 0
        for i in range(n - 1, -1, -1):
            for j in range(n - 1, -1, -1):
                if i + 1 < n and dist[i + 1][j] + 1 < dist[i][j]:
                    dist[i][j] = dist[i + 1][j] + 1
                if j + 1 < n and dist[i][j + 1] + 1 < dist[i][j]:
                    dist[i][j] = dist[i][j + 1] + 1
                # land stays at 0, so a plain running max over the field works
                if dist[i][j] > best:
                    best = dist[i][j]
        return best
