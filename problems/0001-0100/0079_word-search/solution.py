from typing import List


class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        rows, cols = len(board), len(board[0])
        last = len(word) - 1

        def walk(row: int, col: int, index: int) -> bool:
            # The cell must supply this letter; the last letter completes the word.
            if board[row][col] != word[index]:
                return False
            if index == last:
                return True
            # The board doubles as the visited set: overwrite the cell with a
            # marker no letter can equal, so deeper levels cannot step on it.
            board[row][col] = "#"
            found = False
            for delta_row, delta_col in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                next_row, next_col = row + delta_row, col + delta_col
                if 0 <= next_row < rows and 0 <= next_col < cols and walk(next_row, next_col, index + 1):
                    found = True
                    break
            # Restore on the way out: sibling starts and later cases see the board intact.
            board[row][col] = word[index]
            return found

        return any(walk(row, col, 0) for row in range(rows) for col in range(cols))
