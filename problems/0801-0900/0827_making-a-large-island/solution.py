from typing import List, Optional


class Solution:
    def largestIsland(self, grid: List[List[int]]) -> int:
        n = len(grid)
        # Label each 4-connected island with a distinct color and
        # record its size; marking cells as they are pushed finds each
        # island exactly once.
        label = [[0] * n for _ in range(n)]
        sizes = {}

        def flood(si, sj, color):
            count = 0
            stack = [(si, sj)]
            label[si][sj] = color
            while stack:
                i, j = stack.pop()
                count += 1
                for di, dj in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    ni, nj = i + di, j + dj
                    if 0 <= ni < n and 0 <= nj < n and grid[ni][nj] == 1 and label[ni][nj] == 0:
                        label[ni][nj] = color
                        stack.append((ni, nj))
            return count

        color = 0
        for i in range(n):
            for j in range(n):
                if grid[i][j] == 1 and label[i][j] == 0:
                    color += 1
                    sizes[color] = flood(i, j, color)

        # Best starts at the largest existing island — also the answer
        # when the grid is all 1s and no 0 exists to flip.
        best = max(sizes.values(), default=0)
        for i in range(n):
            for j in range(n):
                if grid[i][j] == 0:
                    # Dedup matters: one island can touch this 0 on
                    # several sides, and counting it twice would
                    # overstate the merge.
                    seen = set()
                    for di, dj in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                        ni, nj = i + di, j + dj
                        if 0 <= ni < n and 0 <= nj < n and label[ni][nj] != 0:
                            seen.add(label[ni][nj])
                    # Flipping this 0 merges it with the distinct
                    # neighboring islands.
                    best = max(best, 1 + sum(sizes[c] for c in seen))
        return best
