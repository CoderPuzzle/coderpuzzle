from typing import List, Optional


class Solution:
    def possibleToStamp(self, grid: List[List[int]], stampHeight: int, stampWidth: int) -> bool:
        rows = len(grid)
        columns = len(grid[0])
        occupied = [[0] * (columns + 1) for _ in range(rows + 1)]
        for row in range(rows):
            for column in range(columns):
                occupied[row + 1][column + 1] = (
                    grid[row][column] + occupied[row][column + 1] + occupied[row + 1][column] - occupied[row][column]
                )

        difference = [[0] * (columns + 1) for _ in range(rows + 1)]
        for top in range(rows - stampHeight + 1):
            bottom = top + stampHeight
            for left in range(columns - stampWidth + 1):
                right = left + stampWidth
                total = occupied[bottom][right] - occupied[top][right] - occupied[bottom][left] + occupied[top][left]
                if total == 0:
                    difference[top][left] += 1
                    difference[bottom][left] -= 1
                    difference[top][right] -= 1
                    difference[bottom][right] += 1

        for row in range(rows):
            for column in range(columns):
                if row > 0:
                    difference[row][column] += difference[row - 1][column]
                if column > 0:
                    difference[row][column] += difference[row][column - 1]
                if row > 0 and column > 0:
                    difference[row][column] -= difference[row - 1][column - 1]
                if grid[row][column] == 0 and difference[row][column] == 0:
                    return False
        return True
