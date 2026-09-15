from typing import List


class Solution:
    def tourOfKnight(self, m: int, n: int, r: int, c: int) -> List[List[int]]:
        board = [[-1] * n for _ in range(m)]
        board[r][c] = 0
        moves = ((1, 2), (2, 1), (2, -1), (1, -2), (-1, -2), (-2, -1), (-2, 1), (-1, 2))

        def onward(row, col):
            return sum(
                1 for dr, dc in moves if 0 <= row + dr < m and 0 <= col + dc < n and board[row + dr][col + dc] == -1
            )

        def walk(row, col, order):
            if order == m * n:
                return True
            choices = []
            for dr, dc in moves:
                nr, nc = row + dr, col + dc
                if 0 <= nr < m and 0 <= nc < n and board[nr][nc] == -1:
                    choices.append((onward(nr, nc), nr, nc))
            choices.sort()
            for _, nr, nc in choices:
                board[nr][nc] = order
                if walk(nr, nc, order + 1):
                    return True
                board[nr][nc] = -1
            return False

        walk(r, c, 1)
        return board
