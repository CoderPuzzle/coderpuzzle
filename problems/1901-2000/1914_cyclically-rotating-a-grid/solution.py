from typing import List


class Solution:
    def rotateGrid(self, grid: List[List[int]], k: int) -> List[List[int]]:
        m, n = len(grid), len(grid[0])
        out = [row[:] for row in grid]
        # Each layer is peeled into a ring walked counter-clockwise from its
        # top-left corner. Rotating the layer k times moves every element k
        # steps along that walk, which is one right-rotation of the ring by
        # k % ring_len; the ring is then written back along the same walk.
        for l in range(min(m, n) // 2):
            top, left, bottom, right = l, l, m - 1 - l, n - 1 - l
            pos = (
                [(r, left) for r in range(top, bottom + 1)]
                + [(bottom, c) for c in range(left + 1, right + 1)]
                + [(r, right) for r in range(bottom - 1, top - 1, -1)]
                + [(top, c) for c in range(right - 1, left, -1)]
            )
            L = len(pos)
            s = k % L
            for i, (r, c) in enumerate(pos):
                pr, pc = pos[(i - s) % L]
                out[r][c] = grid[pr][pc]
        return out
