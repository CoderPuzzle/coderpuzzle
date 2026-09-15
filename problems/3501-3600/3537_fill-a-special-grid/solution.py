from typing import List


class Solution:
    def specialGrid(self, n: int) -> List[List[int]]:
        # Bottom-up quadrant doubling. A special grid of level k is, in
        # reading order of the conditions, TL = 3·4^(k-1) + G(k-1) on the
        # left of the top half, TR = G(k-1) on the right, BL and BR follow
        # in the bottom half — so each step rebuilds every row of G(k-1)
        # into one top-half row and one bottom-half row, the top halves
        # grouped before the bottom halves.
        grid = [[0]]
        step = 1
        for _ in range(n):
            half_count = len(grid)
            nxt = [None] * (2 * half_count)
            for index, row in enumerate(grid):
                nxt[index] = [value + 3 * step for value in row] + row
                nxt[half_count + index] = [value + 2 * step for value in row] + [value + step for value in row]
            grid = nxt
            step *= 4
        return grid
