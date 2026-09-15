from typing import List, Optional


class Solution:
    def removeOnes(self, grid: List[List[int]]) -> bool:
        for row in range(len(grid)):
            for column in range(len(grid[0])):
                if grid[row][column] ^ grid[row][0] ^ grid[0][column] ^ grid[0][0]:
                    return False
        return True
