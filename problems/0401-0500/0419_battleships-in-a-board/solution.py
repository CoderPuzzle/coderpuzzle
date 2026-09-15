from typing import List


class Solution:
    def countBattleships(self, board: List[List[str]]) -> int:
        # Battleships are straight horizontal or vertical runs of 'X', and
        # no two ships touch, so each ship has exactly one cell with no 'X'
        # above it and no 'X' to its left: its head, the first of its cells
        # in reading order. Counting heads counts ships.
        m = len(board)
        n = len(board[0])
        count = 0
        for i in range(m):
            for j in range(n):
                if board[i][j] != "X":
                    continue
                if i > 0 and board[i - 1][j] == "X":
                    continue
                if j > 0 and board[i][j - 1] == "X":
                    continue
                count += 1
        return count
