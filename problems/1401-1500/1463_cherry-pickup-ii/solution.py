from typing import List, Optional


class Solution:
    def cherryPickup(self, grid: List[List[int]]) -> int:
        rows, cols = len(grid), len(grid[0])
        NEG = float("-inf")
        # both robots drop one row per step, so the state is just the column
        # pair; unreachable states stay at -inf and never win a max
        dp = [[NEG] * cols for _ in range(cols)]
        # row 0 starts: robot 1 leftmost, robot 2 rightmost; a one-column
        # grid has both share the start cell, counted once
        dp[0][cols - 1] = grid[0][0] + (grid[0][cols - 1] if cols > 1 else 0)
        for r in range(1, rows):
            ndp = [[NEG] * cols for _ in range(cols)]
            for c1 in range(cols):
                for c2 in range(cols):
                    # best of the 9 predecessor column pairs (each robot
                    # steps by -1, 0, or +1 between rows)
                    best = NEG
                    for d1 in (-1, 0, 1):
                        for d2 in (-1, 0, 1):
                            p1, p2 = c1 + d1, c2 + d2
                            if 0 <= p1 < cols and 0 <= p2 < cols and dp[p1][p2] > best:
                                best = dp[p1][p2]
                    if best > NEG:
                        # both cells harvested, except a shared cell counts once
                        ndp[c1][c2] = best + grid[r][c1] + (grid[r][c2] if c1 != c2 else 0)
            dp = ndp
        # every move is strictly downward, so all paths reach the bottom row
        # together — the answer is the best entry of the last table
        return max(max(row) for row in dp)
