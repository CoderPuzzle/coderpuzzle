from typing import List


class Solution:
    def checkXMatrix(self, grid: List[List[int]]) -> bool:
        size = len(grid)
        for row in range(size):
            for col in range(size):
                if row == col or row + col == size - 1:
                    if grid[row][col] == 0:
                        return False
                elif grid[row][col] != 0:
                    return False
        return True
