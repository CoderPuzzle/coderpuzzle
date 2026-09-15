from typing import List


class Solution:
    def candyCrush(self, board: List[List[int]]) -> List[List[int]]:
        # One round: flag every candy inside a horizontal or vertical run
        # of three or more equal values, empty the flagged cells, then let
        # gravity settle every column. Both sweeps read the untouched
        # board, so the flags land simultaneously — an L or T of one candy
        # type loses all of its cells in a single round. Repeat until a
        # round flags nothing; that board is stable.
        rows, cols = len(board), len(board[0])
        while True:
            marked = [[False] * cols for _ in range(rows)]
            crushed = False
            for i in range(rows):
                for j in range(cols - 2):
                    value = board[i][j]
                    if value != 0 and value == board[i][j + 1] == board[i][j + 2]:
                        marked[i][j] = marked[i][j + 1] = marked[i][j + 2] = True
                        crushed = True
            for j in range(cols):
                for i in range(rows - 2):
                    value = board[i][j]
                    if value != 0 and value == board[i + 1][j] == board[i + 2][j]:
                        marked[i][j] = marked[i + 1][j] = marked[i + 2][j] = True
                        crushed = True
            if not crushed:
                return board
            for i in range(rows):
                for j in range(cols):
                    if marked[i][j]:
                        board[i][j] = 0
            # Gravity: each column compacts downward in place — candies
            # fall past the holes, holes bubble to the top.
            for j in range(cols):
                write = rows - 1
                for i in range(rows - 1, -1, -1):
                    if board[i][j] != 0:
                        board[write][j] = board[i][j]
                        write -= 1
                for i in range(write, -1, -1):
                    board[i][j] = 0
