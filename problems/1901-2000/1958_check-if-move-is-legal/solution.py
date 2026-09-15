from typing import List


class Solution:
    def checkMove(self, board: List[List[str]], rMove: int, cMove: int, color: str) -> bool:
        # Walk the eight directions from the move cell: a legal move needs a
        # run of the opposite color ending in a cell of the move's color.
        opposite = "W" if color == "B" else "B"
        for dr, dc in ((-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)):
            r, c = rMove + dr, cMove + dc
            if not (0 <= r < 8 and 0 <= c < 8) or board[r][c] != opposite:
                continue
            r += dr
            c += dc
            while 0 <= r < 8 and 0 <= c < 8 and board[r][c] == opposite:
                r += dr
                c += dc
            if 0 <= r < 8 and 0 <= c < 8 and board[r][c] == color:
                return True
        return False
