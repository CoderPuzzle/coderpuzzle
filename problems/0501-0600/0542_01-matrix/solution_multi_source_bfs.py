from collections import deque


class Solution:
    def updateMatrix(self, mat: list[list[int]]) -> list[list[int]]:
        m, n = len(mat), len(mat[0])
        dist = [[None] * n for _ in range(m)]
        queue = deque()
        # Reverse the question: every zero broadcasts at distance 0 and the
        # first wavefront to reach a cell arrives on a shortest path.
        for i in range(m):
            for j in range(n):
                if mat[i][j] == 0:
                    dist[i][j] = 0
                    queue.append((i, j))
        while queue:
            i, j = queue.popleft()
            for di, dj in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                ni, nj = i + di, j + dj
                if 0 <= ni < m and 0 <= nj < n and dist[ni][nj] is None:
                    # An unset distance doubles as the visited check, and
                    # assigning before enqueueing keeps each cell queued
                    # exactly once; non-decreasing dequeue order makes the
                    # first assignment final.
                    dist[ni][nj] = dist[i][j] + 1
                    queue.append((ni, nj))
        return dist
