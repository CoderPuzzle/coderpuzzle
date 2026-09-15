from typing import List


class Solution:
    def findPattern(self, board: List[List[int]], pattern: List[str]) -> List[int]:
        # Corners are scanned row-major, so the first hit already carries
        # the lowest row and then the lowest column. Each candidate is
        # validated by one pass that grows a letter->digit bijection:
        # a letter must repeat its own digit, and a digit already claimed
        # by one letter is refused for every other letter.
        def matches(r, c):
            to_digit, to_letter = {}, {}
            for i, row in enumerate(pattern):
                for j, ch in enumerate(row):
                    value = board[r + i][c + j]
                    if ch.isdigit():
                        if value != int(ch):
                            return False
                    elif ch in to_digit:
                        if to_digit[ch] != value:
                            return False
                    elif value in to_letter:
                        return False
                    else:
                        to_digit[ch] = value
                        to_letter[value] = ch
            return True

        rows, cols = len(board), len(board[0])
        p_rows, p_cols = len(pattern), len(pattern[0])
        for r in range(rows - p_rows + 1):
            for c in range(cols - p_cols + 1):
                if matches(r, c):
                    return [r, c]
        return [-1, -1]
