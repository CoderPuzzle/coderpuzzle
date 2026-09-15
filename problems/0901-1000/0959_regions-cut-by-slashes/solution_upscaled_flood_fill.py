from typing import List


class Solution:
    def regionsBySlashes(self, grid: List[str]) -> int:
        # Blow every square up into a 3x3 block and paint its wall as
        # blocked pixels along the block's diagonal: '/' fills the
        # anti-diagonal, '\' the main diagonal, a blank fills nothing.
        # Corner contacts survive the upscale because the diagonals of two
        # blocks meeting at a corner leave the pixels beside them open, so
        # the regions are just the connected components of open pixels — an
        # explicit-stack flood fill counts them.
        n = len(grid)
        size = 3 * n
        blocked = [[False] * size for _ in range(size)]
        for i in range(n):
            for j in range(n):
                ch = grid[i][j]
                if ch == "/":
                    blocked[3 * i][3 * j + 2] = True
                    blocked[3 * i + 1][3 * j + 1] = True
                    blocked[3 * i + 2][3 * j] = True
                elif ch == "\\":
                    blocked[3 * i][3 * j] = True
                    blocked[3 * i + 1][3 * j + 1] = True
                    blocked[3 * i + 2][3 * j + 2] = True
        # One flood fill per unvisited open pixel; each fill claims exactly
        # one region, so the number of fills is the answer.
        seen = [[False] * size for _ in range(size)]
        regions = 0
        for r in range(size):
            for c in range(size):
                if blocked[r][c] or seen[r][c]:
                    continue
                regions += 1
                seen[r][c] = True
                stack = [(r, c)]
                while stack:
                    cr, cc = stack.pop()
                    for nr, nc in ((cr - 1, cc), (cr + 1, cc), (cr, cc - 1), (cr, cc + 1)):
                        if 0 <= nr < size and 0 <= nc < size and not blocked[nr][nc] and not seen[nr][nc]:
                            seen[nr][nc] = True
                            stack.append((nr, nc))
        return regions
