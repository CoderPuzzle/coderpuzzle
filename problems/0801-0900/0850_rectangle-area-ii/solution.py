from typing import List, Optional


class Solution:
    def rectangleArea(self, rectangles: List[List[int]]) -> int:
        MOD = 10**9 + 7
        # Coordinate compression: with at most 2R distinct values per
        # axis, cell boundaries are exactly the rectangle edges, so
        # coverage is constant within each cell.
        xs = sorted({x for rect in rectangles for x in (rect[0], rect[2])})
        ys = sorted({y for rect in rectangles for y in (rect[1], rect[3])})
        x_index = {x: i for i, x in enumerate(xs)}
        y_index = {y: i for i, y in enumerate(ys)}
        grid = [[False] * (len(ys) - 1) for _ in range(len(xs) - 1)]
        # Mark the half-open compressed range: adjacent rectangles
        # share edge cells without overlap or gaps, and idempotent
        # marking counts overlaps once.
        for x1, y1, x2, y2 in rectangles:
            for i in range(x_index[x1], x_index[x2]):
                for j in range(y_index[y1], y_index[y2]):
                    grid[i][j] = True
        # Sum the real areas of marked cells, reducing at each step.
        total = 0
        for i in range(len(xs) - 1):
            for j in range(len(ys) - 1):
                if grid[i][j]:
                    total = (total + (xs[i + 1] - xs[i]) * (ys[j + 1] - ys[j])) % MOD
        return total
