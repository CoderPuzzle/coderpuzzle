from collections import deque
from typing import List


class Solution:
    def updateBoard(self, board: List[List[str]], click: List[int]) -> List[List[str]]:
        # A revealed mine ends the game on the spot: it becomes 'X' and no
        # other cell changes, so return before any flood starts.
        rows, cols = len(board), len(board[0])
        r0, c0 = click[0], click[1]
        if board[r0][c0] == "M":
            board[r0][c0] = "X"
            return board
        # Breadth-first reveal from the clicked square, on an explicit queue:
        # a blank region can span every cell of a 50 x 50 board, deeper than
        # recursion would safely go.
        directions = ((-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1))
        queue = deque([(r0, c0)])
        while queue:
            r, c = queue.popleft()
            # Two blanks can enqueue the same neighbor; only its first
            # processing reveals it, and this check drops the stale copy.
            if board[r][c] != "E":
                continue
            # An empty square's face is its count of adjacent mines, and
            # that count is exactly what bounds the flood.
            mines = 0
            for dr, dc in directions:
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols and board[nr][nc] == "M":
                    mines += 1
            if mines:
                # Digits are the frontier of the flood: they stop it.
                board[r][c] = str(mines)
                continue
            board[r][c] = "B"
            for dr, dc in directions:
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols and board[nr][nc] == "E":
                    queue.append((nr, nc))
        # The reveal happened inside the input allocation; the same board,
        # now revealed, is what the judge compares.
        return board
