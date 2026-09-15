from typing import List


class Solution:
    def finalPositionOfSnake(self, n: int, commands: List[str]) -> int:
        # Each command moves exactly one coordinate by one step; the
        # statement's guarantee keeps both within [0, n), so no boundary
        # checks are needed.
        row, col = 0, 0
        for command in commands:
            if command == "UP":
                row -= 1
            elif command == "DOWN":
                row += 1
            elif command == "LEFT":
                col -= 1
            else:  # "RIGHT"
                col += 1
        return row * n + col
