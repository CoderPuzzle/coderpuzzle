from typing import List


class Solution:
    def createGrid(self, m: int, n: int, k: int) -> List[str]:
        if m == 1 or n == 1:
            if k != 1:
                return []
            return ["." * n] if m == 1 else ["."] * m

        # (height, width, blocked cells inside the block) per k, tried in
        # order until one fits the board.
        blocks = {
            1: [(1, 1, ())],
            2: [(2, 2, ())],
            3: [(2, 3, ()), (3, 2, ())],
            4: [(2, 4, ()), (4, 2, ()), (3, 3, ((0, 2), (2, 0)))],
        }[k]
        for height, width, blocked in blocks:
            if height > m or width > n:
                continue
            grid = [["#"] * n for _ in range(m)]
            for i in range(height):
                for j in range(width):
                    grid[i][j] = "."
            for i, j in blocked:
                grid[i][j] = "#"
            # single corridor from the block's bottom-right to (m-1, n-1)
            for j in range(width - 1, n):
                grid[height - 1][j] = "."
            for i in range(height - 1, m):
                grid[i][n - 1] = "."
            return ["".join(row) for row in grid]
        return []
