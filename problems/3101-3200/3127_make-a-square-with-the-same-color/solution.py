from typing import List


class Solution:
    def canMakeSquare(self, grid: List[List[str]]) -> bool:
        # A 2x2 square becomes monochrome with at most one recolor exactly
        # when it is not split 2-2, i.e. one color already owns at least
        # three of its four cells; a single flip then absorbs the odd cell
        # out. Four candidate squares to check.
        for r in range(2):
            for c in range(2):
                cells = [grid[r][c], grid[r][c + 1], grid[r + 1][c], grid[r + 1][c + 1]]
                if max(cells.count("B"), cells.count("W")) >= 3:
                    return True
        return False
