from typing import List


class Solution:
    def numMagicSquaresInside(self, grid: List[List[int]]) -> int:
        # Every 3 x 3 window is judged independently, so the scan visits
        # each window's top-left corner and tests it; a grid shorter than
        # three rows or columns leaves the sweep empty.
        rows, cols = len(grid), len(grid[0])

        def is_magic(r: int, c: int) -> bool:
            # Nine distinct values 1..9 total 45, so the four lines through
            # the center add to 4*15 = 45 + 3*center — the center must be 5.
            # One comparison clears most windows.
            if grid[r + 1][c + 1] != 5:
                return False
            # Every row, column, and both diagonals must sum to 15.
            for i in range(3):
                if grid[r + i][c] + grid[r + i][c + 1] + grid[r + i][c + 2] != 15:
                    return False
                if grid[r][c + i] + grid[r + 1][c + i] + grid[r + 2][c + i] != 15:
                    return False
            if grid[r][c] + grid[r + 1][c + 1] + grid[r + 2][c + 2] != 15:
                return False
            if grid[r][c + 2] + grid[r + 1][c + 1] + grid[r + 2][c] != 15:
                return False
            # The sums cannot see which values produced them: a seen-set
            # confirms the nine entries are distinct and within 1..9.
            seen = set()
            for i in range(3):
                for j in range(3):
                    v = grid[r + i][c + j]
                    if v < 1 or v > 9 or v in seen:
                        return False
                    seen.add(v)
            return True

        count = 0
        for r in range(rows - 2):
            for c in range(cols - 2):
                if is_magic(r, c):
                    count += 1
        return count
