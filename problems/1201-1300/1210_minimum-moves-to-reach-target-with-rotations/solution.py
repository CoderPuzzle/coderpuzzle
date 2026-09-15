from collections import deque
from typing import List


class Solution:
    def minimumMoves(self, grid: List[List[int]]) -> int:
        # State (r, c, horizontal): (r, c) is the upper-left occupied cell;
        # horizontal snakes occupy (r,c) and (r,c+1), vertical (r,c),(r+1,c).
        n = len(grid)
        target = (n - 1, n - 2, 1)
        queue = deque([(0, 0, 1, 0)])
        visited = {(0, 0, 1)}
        while queue:
            r, c, horizontal, moves = queue.popleft()
            if (r, c, horizontal) == target:
                return moves
            if horizontal:
                # Slide right: the new head cell must be empty.
                if c + 2 < n and grid[r][c + 2] == 0 and (r, c + 1, 1) not in visited:
                    visited.add((r, c + 1, 1))
                    queue.append((r, c + 1, 1, moves + 1))
                # Slide down: both cells of the new row must be empty.
                if r + 1 < n and grid[r + 1][c] == 0 and grid[r + 1][c + 1] == 0 and (r + 1, c, 1) not in visited:
                    visited.add((r + 1, c, 1))
                    queue.append((r + 1, c, 1, moves + 1))
                # Rotate clockwise: the two cells under the snake must be empty.
                if r + 1 < n and grid[r + 1][c] == 0 and grid[r + 1][c + 1] == 0 and (r, c, 0) not in visited:
                    visited.add((r, c, 0))
                    queue.append((r, c, 0, moves + 1))
            else:
                # Slide right: both cells of the new column must be empty.
                if c + 1 < n and grid[r][c + 1] == 0 and grid[r + 1][c + 1] == 0 and (r, c + 1, 0) not in visited:
                    visited.add((r, c + 1, 0))
                    queue.append((r, c + 1, 0, moves + 1))
                # Slide down: the new tail cell must be empty.
                if r + 2 < n and grid[r + 2][c] == 0 and (r + 1, c, 0) not in visited:
                    visited.add((r + 1, c, 0))
                    queue.append((r + 1, c, 0, moves + 1))
                # Rotate counterclockwise: the two cells to the right must be empty.
                if c + 1 < n and grid[r][c + 1] == 0 and grid[r + 1][c + 1] == 0 and (r, c, 1) not in visited:
                    visited.add((r, c, 1))
                    queue.append((r, c, 1, moves + 1))
        return -1
