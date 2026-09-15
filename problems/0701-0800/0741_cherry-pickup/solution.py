from typing import List


class Solution:
    def cherryPickup(self, grid: List[List[int]]) -> int:
        n = len(grid)
        # dp[r1][r2]: best cherries with walker 1 at (r1, t-r1) and walker 2 at
        # (r2, t-r2) after t steps; -1 marks unreachable states.
        dp = [[-1] * n for _ in range(n)]
        dp[0][0] = grid[0][0]
        for t in range(1, 2 * n - 1):
            ndp = [[-1] * n for _ in range(n)]
            lo, hi = max(0, t - n + 1), min(n - 1, t)
            for r1 in range(lo, hi + 1):
                c1 = t - r1
                if grid[r1][c1] == -1:
                    continue
                for r2 in range(r1, hi + 1):
                    c2 = t - r2
                    if grid[r2][c2] == -1:
                        continue
                    best = -1
                    for pr1 in (r1 - 1, r1):
                        for pr2 in (r2 - 1, r2):
                            if 0 <= pr1 < n and 0 <= pr2 < n:
                                best = max(best, dp[pr1][pr2])
                    if best < 0:
                        continue
                    gain = grid[r1][c1] + (grid[r2][c2] if r1 != r2 else 0)
                    ndp[r1][r2] = best + gain
            dp = ndp
        return max(dp[n - 1][n - 1], 0)
