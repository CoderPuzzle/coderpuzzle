from typing import List


class Solution:
    def zigzagTraversal(self, grid: List[List[int]]) -> List[int]:
        # Sweep the rows in zigzag order (even rows left-to-right, odd rows
        # reversed) flipping a take/skip toggle at every cell.
        result = []
        take = True
        for i, row in enumerate(grid):
            cells = row if i % 2 == 0 else reversed(row)
            for value in cells:
                if take:
                    result.append(value)
                take = not take
        return result
