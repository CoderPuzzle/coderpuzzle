from typing import List


class Solution:
    def getMaximumGold(self, grid: List[List[int]]) -> int:
        rows, cols = len(grid), len(grid[0])
        best = 0

        def walk(r: int, c: int) -> int:
            # Zeroing on entry doubles as the visited mark; restore on exit.
            gold = grid[r][c]
            grid[r][c] = 0
            deepest = 0
            for nr, nc in ((r - 1, c), (r + 1, c), (r, c - 1), (r, c + 1)):
                if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] > 0:
                    deepest = max(deepest, walk(nr, nc))
            grid[r][c] = gold
            return gold + deepest

        for r in range(rows):
            for c in range(cols):
                if grid[r][c] > 0:
                    best = max(best, walk(r, c))
        return best
