from typing import List


class Solution:
    def reverseSubmatrix(self, grid: List[List[int]], x: int, y: int, k: int) -> List[List[int]]:
        # Two pointers walk inward from the square's top and bottom rows;
        # each step exchanges the k columns the square spans. A middle row
        # of an odd-sided square pairs with itself and needs no work.
        top, bottom = x, x + k - 1
        while top < bottom:
            for j in range(y, y + k):
                grid[top][j], grid[bottom][j] = grid[bottom][j], grid[top][j]
            top += 1
            bottom -= 1
        return grid
