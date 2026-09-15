from typing import List


class Solution:
    def shiftGrid(self, grid: List[List[int]], k: int) -> List[List[int]]:
        m, n = len(grid), len(grid[0])
        total = m * n
        k %= total
        # One shift = a cyclic right-rotation of the flattened grid.
        flat = [grid[r][c] for r in range(m) for c in range(n)]
        shifted = [0] * total
        for p, v in enumerate(flat):
            shifted[(p + k) % total] = v
        return [shifted[r * n : (r + 1) * n] for r in range(m)]
