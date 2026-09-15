from typing import List


class Solution:
    def placeWordInCrossword(self, board: List[List[str]], word: str) -> bool:
        rows = len(board)
        columns = len(board[0])

        def matches(row: int, column: int, row_step: int, column_step: int, length: int) -> bool:
            if length != len(word):
                return False
            forward = True
            backward = True
            for offset in range(length):
                cell = board[row + row_step * offset][column + column_step * offset]
                if cell != " ":
                    forward = forward and cell == word[offset]
                    backward = backward and cell == word[length - 1 - offset]
            return forward or backward

        for row in range(rows):
            start = 0
            for end in range(columns + 1):
                if end == columns or board[row][end] == "#":
                    if matches(row, start, 0, 1, end - start):
                        return True
                    start = end + 1

        for column in range(columns):
            start = 0
            for end in range(rows + 1):
                if end == rows or board[end][column] == "#":
                    if matches(start, column, 1, 0, end - start):
                        return True
                    start = end + 1

        return False
