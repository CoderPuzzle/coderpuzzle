class Solution:
    def longestIncreasingPath(self, matrix: list[list[int]]) -> int:
        if not matrix or not matrix[0]:
            return 0
        m, n = len(matrix), len(matrix[0])
        # memo[i][j] = longest ascending walk starting at (i, j); 0 means
        # "not computed yet".
        memo = [[0] * n for _ in range(m)]
        directions = ((1, 0), (-1, 0), (0, 1), (0, -1))
        best = 0
        for si in range(m):
            for sj in range(n):
                if memo[si][sj]:
                    continue
                # The DFS call stack, made explicit: each frame is
                # [row, column, next direction to try]. A frame pops once
                # all four directions have been explored.
                stack = [[si, sj, 0]]
                while stack:
                    frame = stack[-1]
                    i, j, k = frame
                    if k == 0:
                        # First visit: the cell on its own is a walk of 1.
                        memo[i][j] = 1
                    if k == 4:
                        # Every larger neighbour has been absorbed, so the
                        # frame's value is final: report it and hand it to
                        # the frame below (the cell that descended here).
                        stack.pop()
                        if memo[i][j] > best:
                            best = memo[i][j]
                        if stack:
                            pi, pj, _ = stack[-1]
                            if memo[i][j] + 1 > memo[pi][pj]:
                                memo[pi][pj] = memo[i][j] + 1
                        continue
                    di, dj = directions[k]
                    frame[2] += 1
                    ni, nj = i + di, j + dj
                    # Only strictly larger neighbours continue the walk.
                    if 0 <= ni < m and 0 <= nj < n and matrix[ni][nj] > matrix[i][j]:
                        if memo[ni][nj] == 0:
                            stack.append([ni, nj, 0])
                        else:
                            # Finished earlier — its memo is final already.
                            if memo[ni][nj] + 1 > memo[i][j]:
                                memo[i][j] = memo[ni][nj] + 1
        return best
