from typing import List, Optional


class Solution:
    def gameOfLife(self, board: List[List[int]]) -> List[List[int]]:
        m, n = len(board), len(board[0])
        dirs = ((-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1))
        for r in range(m):
            for c in range(n):
                live = 0
                for dr, dc in dirs:
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < m and 0 <= nc < n and board[nr][nc] in (1, 2):
                        live += 1
                if board[r][c] == 1 and (live < 2 or live > 3):
                    board[r][c] = 2  # live -> dead
                elif board[r][c] == 0 and live == 3:
                    board[r][c] = 3  # dead -> live
        for r in range(m):
            for c in range(n):
                board[r][c] = 1 if board[r][c] in (1, 3) else 0
        return board
