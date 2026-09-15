from typing import List, Optional


class Solution:
    def countSubIslands(self, grid1: List[List[int]], grid2: List[List[int]]) -> int:
        m, n = len(grid2), len(grid2[0])
        seen = [[False] * n for _ in range(m)]
        count = 0
        for si in range(m):
            for sj in range(n):
                # An unseen grid2 land cell starts a fresh island: it is a sub-island
                # iff EVERY one of its cells is also land in grid1 — no island
                # matching between the grids is needed.
                if grid2[si][sj] == 1 and not seen[si][sj]:
                    seen[si][sj] = True
                    # Explicit stack (not recursion): 500x500 grids would overflow it.
                    stack = [(si, sj)]
                    is_sub = True
                    while stack:
                        x, y = stack.pop()
                        # One water cell in grid1 disqualifies the whole island
                        # (the flag is only read after the fill completes).
                        if grid1[x][y] != 1:
                            is_sub = False
                        for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                            nx, ny = x + dx, y + dy
                            if 0 <= nx < m and 0 <= ny < n and grid2[nx][ny] == 1 and not seen[nx][ny]:
                                # Mark at push time so no cell is ever enqueued twice.
                                seen[nx][ny] = True
                                stack.append((nx, ny))
                    if is_sub:
                        count += 1
        return count
