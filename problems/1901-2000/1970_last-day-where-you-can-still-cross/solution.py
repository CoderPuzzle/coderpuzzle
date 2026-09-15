from typing import List, Optional
from collections import deque


class Solution:
    def latestDayToCross(self, row: int, col: int, cells: List[List[int]]) -> int:
        def can_cross(flooded):
            # Rebuild the grid for this query day: mark the flooded cells
            # as water, then test a top-to-bottom walk by BFS.
            grid = [[0] * col for _ in range(row)]
            for r, c in flooded:
                grid[r - 1][c - 1] = 1
            queue = deque()
            seen = [[False] * col for _ in range(row)]
            # Multi-source BFS: every unflooded top-row cell is a start.
            for c in range(col):
                if grid[0][c] == 0:
                    queue.append((0, c))
                    seen[0][c] = True
            while queue:
                r, c = queue.popleft()
                if r == row - 1:
                    return True  # bottom row reached: crossing still possible
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < row and 0 <= nc < col and not seen[nr][nc] and grid[nr][nc] == 0:
                        seen[nr][nc] = True
                        queue.append((nr, nc))
            return False

        # Land only floods, never dries, so crossable days form a prefix of
        # days: binary-search its right endpoint. Day 1 is always crossable.
        lo, hi = 1, row * col
        while lo < hi:
            mid = (lo + hi + 1) // 2  # upper mid: converge on last feasible day
            if can_cross(cells[:mid]):
                lo = mid
            else:
                hi = mid - 1
        return lo
