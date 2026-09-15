from typing import List


class NeighborSum:
    """Construction indexes where every value lives; each query looks the
    value up once and adds its four in-bounds neighbors straight off the
    grid. Distinct values make the index exact, and edge cells simply find
    fewer in-bounds neighbors — no corner or border special cases.
    """

    def __init__(self, grid: List[List[int]]) -> None:
        # One walk builds the whole index: values are distinct, so each
        # cell's value claims exactly one entry.
        self.grid = grid
        self.n = len(grid)
        self.position = {}
        for r in range(self.n):
            for c in range(self.n):
                self.position[grid[r][c]] = (r, c)

    def adjacentSum(self, value: int) -> int:
        r, c = self.position[value]
        total = 0
        for dr, dc in ((-1, 0), (1, 0), (0, -1), (0, 1)):
            if 0 <= r + dr < self.n and 0 <= c + dc < self.n:
                total += self.grid[r + dr][c + dc]
        return total

    def diagonalSum(self, value: int) -> int:
        r, c = self.position[value]
        total = 0
        for dr, dc in ((-1, -1), (-1, 1), (1, -1), (1, 1)):
            if 0 <= r + dr < self.n and 0 <= c + dc < self.n:
                total += self.grid[r + dr][c + dc]
        return total
