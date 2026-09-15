from typing import List, Optional


class Solution:
    def gameOfLife(self, board: List[List[int]]) -> List[List[int]]:
        m, n = len(board), len(board[0])
        # Snapshot the current generation: every neighbor count must read
        # the old states even while the board itself is being overwritten.
        snapshot = [row[:] for row in board]
        dirs = ((-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1))
        for r in range(m):
            for c in range(n):
                live = 0
                # Count live neighbors in the snapshot; cells outside the
                # board count as dead via the bounds check.
                for dr, dc in dirs:
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < m and 0 <= nc < n and snapshot[nr][nc] == 1:
                        live += 1
                # Rules applied to the old state: live survives on 2 or 3,
                # dead is born on exactly 3, everything else dies/stays dead.
                if snapshot[r][c] == 1:
                    board[r][c] = 1 if live in (2, 3) else 0
                else:
                    board[r][c] = 1 if live == 3 else 0
        return board
