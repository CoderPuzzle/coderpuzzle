from typing import List


class Solution:
    def createGrid(self, m: int, n: int) -> List[str]:
        grid = ["." * n]
        grid.extend("#" * (n - 1) + "." for _ in range(m - 1))
        return grid
