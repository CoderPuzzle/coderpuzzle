from typing import List


class Solution:
    def countCoveredBuildings(self, n: int, buildings: List[List[int]]) -> int:
        # Per x-line: extreme y values; per y-line: extreme x values. A
        # building is covered exactly when it is strictly inside both.
        row_min_y = [n + 1] * (n + 1)
        row_max_y = [0] * (n + 1)
        col_min_x = [n + 1] * (n + 1)
        col_max_x = [0] * (n + 1)
        for x, y in buildings:
            if y < row_min_y[x]:
                row_min_y[x] = y
            if y > row_max_y[x]:
                row_max_y[x] = y
            if x < col_min_x[y]:
                col_min_x[y] = x
            if x > col_max_x[y]:
                col_max_x[y] = x
        covered = 0
        for x, y in buildings:
            if row_min_y[x] < y < row_max_y[x] and col_min_x[y] < x < col_max_x[y]:
                covered += 1
        return covered
