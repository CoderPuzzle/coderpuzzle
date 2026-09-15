from typing import List


class Solution:
    def sortMatrix(self, grid: List[List[int]]) -> List[List[int]]:
        # Cells with i - j >= 0 form the bottom-left triangle together
        # with the middle diagonal (descending); i - j < 0 is the top-right
        # triangle (ascending). Visiting row-major keeps every diagonal's
        # values in top-left-to-bottom-right order, so one cursor per
        # diagonal pours them back in place.
        n = len(grid)
        diags = {}
        for i in range(n):
            for j in range(n):
                diags.setdefault(i - j, []).append(grid[i][j])
        for d, vals in diags.items():
            vals.sort(reverse=d >= 0)
        pos = dict.fromkeys(diags, 0)
        out = [[0] * n for _ in range(n)]
        for i in range(n):
            for j in range(n):
                d = i - j
                out[i][j] = diags[d][pos[d]]
                pos[d] += 1
        return out
