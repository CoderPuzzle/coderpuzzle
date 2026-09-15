from typing import List


class Solution:
    def largest1BorderedSquare(self, grid: List[List[int]]) -> int:
        rows, cols = len(grid), len(grid[0])
        # prefix[i][j] = sum of the grid rectangle [0..i) x [0..j)
        prefix = [[0] * (cols + 1) for _ in range(rows + 1)]
        for i in range(rows):
            row_prefix = prefix[i + 1]
            above = prefix[i]
            row_grid = grid[i]
            for j in range(cols):
                row_prefix[j + 1] = row_grid[j] + above[j + 1] + row_prefix[j] - above[j]

        def rect(r1, c1, r2, c2):
            # inclusive-corner rectangle sum, O(1) via the prefix table
            return prefix[r2 + 1][c2 + 1] - prefix[r1][c2 + 1] - prefix[r2 + 1][c1] + prefix[r1][c1]

        best = 0
        for r1 in range(rows):
            for c1 in range(cols):
                limit = min(rows - r1, cols - c1)
                for side in range(1, limit + 1):
                    r2, c2 = r1 + side - 1, c1 + side - 1
                    # Each edge is solid iff its cell sum equals its length.
                    if (
                        rect(r1, c1, r1, c2) == side
                        and rect(r2, c1, r2, c2) == side
                        and rect(r1, c1, r2, c1) == side
                        and rect(r1, c2, r2, c2) == side
                    ):
                        if side * side > best:
                            best = side * side
        return best
