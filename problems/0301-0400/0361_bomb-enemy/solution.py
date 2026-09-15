from typing import List


class Solution:
    def maxKilledEnemies(self, grid: List[List[str]]) -> int:
        # A bomb planted on an empty cell kills along its row and column
        # until a wall, so its reach is the two wall-free segments crossing
        # the cell. Every empty cell in a segment shares that segment's
        # enemies: count each segment once and reuse the count.
        m = len(grid)
        n = len(grid[0])
        col_hits = [0] * n
        best = 0
        for i in range(m):
            row_hits = 0
            for j in range(n):
                # First cell of a row segment (after a wall or at the left
                # edge): one scan counts the enemies up to the next wall.
                if j == 0 or grid[i][j - 1] == "W":
                    row_hits = 0
                    for k in range(j, n):
                        if grid[i][k] == "W":
                            break
                        if grid[i][k] == "E":
                            row_hits += 1
                # Same lazily per column: recount only when the cell above
                # is a wall or the top edge.
                if i == 0 or grid[i - 1][j] == "W":
                    col_hits[j] = 0
                    for k in range(i, m):
                        if grid[k][j] == "W":
                            break
                        if grid[k][j] == "E":
                            col_hits[j] += 1
                if grid[i][j] == "0":
                    best = max(best, row_hits + col_hits[j])
        return best
