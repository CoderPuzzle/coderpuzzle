from typing import List


class Solution:
    def isValidSudoku(self, board: List[List[str]]) -> bool:
        # One seen-set per row, column, and 3x3 box: insert each filled
        # cell's digit into the three units it belongs to, and the first
        # repeat anywhere is the answer.
        rows = [set() for _ in range(9)]
        columns = [set() for _ in range(9)]
        boxes = [set() for _ in range(9)]
        for r in range(9):
            for c in range(9):
                digit = board[r][c]
                if digit == ".":
                    continue
                # Rows and columns are chunked in threes, so this numbers
                # the 3x3 boxes 0 through 8.
                b = (r // 3) * 3 + c // 3
                if digit in rows[r] or digit in columns[c] or digit in boxes[b]:
                    return False
                rows[r].add(digit)
                columns[c].add(digit)
                boxes[b].add(digit)
        return True
