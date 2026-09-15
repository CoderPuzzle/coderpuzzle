from typing import List


class Solution:
    def removeOnes(self, grid: List[List[int]]) -> int:
        # Every operation clears the row and column of one chosen 1-cell.
        # With at most 15 cells, a plain recursion over "which 1-cell do we
        # clear next" explores the whole space quickly; memoizing on the
        # bitmask of remaining ones keeps repeated boards free.
        m, n = len(grid), len(grid[0])

        memo = {}

        def solve(state: int) -> int:
            if state == 0:
                return 0
            if state in memo:
                return memo[state]
            best = m * n + 1
            for cell in range(m * n):
                if (state >> cell) & 1:
                    cleared = state
                    for j in range(n):
                        cleared &= ~(1 << ((cell // n) * n + j))
                    for i in range(m):
                        cleared &= ~(1 << (i * n + (cell % n)))
                    best = min(best, 1 + solve(cleared))
            memo[state] = best
            return best

        state = 0
        for i in range(m):
            for j in range(n):
                if grid[i][j]:
                    state |= 1 << (i * n + j)
        return solve(state)
