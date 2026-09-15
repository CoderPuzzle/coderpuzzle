class Solution:
    def updateMatrix(self, mat: list[list[int]]) -> list[list[int]]:
        m, n = len(mat), len(mat[0])
        # No cell sits farther than m*n steps from a zero, so that value
        # stands in for "not yet settled" without colliding with a real
        # distance; zero cells start settled at 0.
        far = m * n + 1
        dist = [[0 if mat[i][j] == 0 else far for j in range(n)] for i in range(m)]
        # Forward sweep: each cell learns from the top and left neighbours,
        # so every zero up and to the left has already done its work here.
        for i in range(m):
            for j in range(n):
                best = dist[i][j]
                if i > 0 and dist[i - 1][j] + 1 < best:
                    best = dist[i - 1][j] + 1
                if j > 0 and dist[i][j - 1] + 1 < best:
                    best = dist[i][j - 1] + 1
                dist[i][j] = best
        # Backward sweep: the same argument with the bottom and right
        # neighbours, so a nearest zero in any direction has now been
        # heard from — whichever sweep met the closer zero wins.
        for i in range(m - 1, -1, -1):
            for j in range(n - 1, -1, -1):
                best = dist[i][j]
                if i < m - 1 and dist[i + 1][j] + 1 < best:
                    best = dist[i + 1][j] + 1
                if j < n - 1 and dist[i][j + 1] + 1 < best:
                    best = dist[i][j + 1] + 1
                dist[i][j] = best
        return dist
