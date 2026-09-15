from typing import List


class Solution:
    def numRookCaptures(self, board: List[List[str]]) -> int:
        rook_row = rook_col = -1
        for row in range(8):
            for col in range(8):
                if board[row][col] == "R":
                    rook_row, rook_col = row, col

        captures = 0
        for delta_row, delta_col in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            row, col = rook_row + delta_row, rook_col + delta_col
            # Walk while the path is still empty; stop at the first piece or the edge.
            while 0 <= row < 8 and 0 <= col < 8 and board[row][col] == ".":
                row += delta_row
                col += delta_col
            if 0 <= row < 8 and 0 <= col < 8 and board[row][col] == "p":
                captures += 1
        return captures
