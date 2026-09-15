from typing import List


class Solution:
    def minFlips(self, grid: List[List[int]]) -> int:
        # Reflections in both axes partition the cells into orbits that must
        # end uniform: quadrant quadruples, pairs along the middle row/column
        # of odd dimensions, and the lone center when both are odd. Price
        # each orbit at its cheaper value first.
        m, n = len(grid), len(grid[0])
        cost = 0
        for i in range(m // 2):
            for j in range(n // 2):
                ones = grid[i][j] + grid[i][n - 1 - j] + grid[m - 1 - i][j] + grid[m - 1 - i][n - 1 - j]
                cost += min(ones, 4 - ones)
        splits = uniforms = 0
        if m % 2 == 1:
            row = grid[m // 2]
            for j in range(n // 2):
                ones = row[j] + row[n - 1 - j]
                cost += min(ones, 2 - ones)
                if ones == 1:
                    splits += 1
                elif ones == 2:
                    uniforms += 1
        if n % 2 == 1:
            for i in range(m // 2):
                ones = grid[i][n // 2] + grid[m - 1 - i][n // 2]
                cost += min(ones, 2 - ones)
                if ones == 1:
                    splits += 1
                elif ones == 2:
                    uniforms += 1
        # Divisibility reads only the small orbits: a quadruple holds a
        # multiple of four 1s either way, a finished pair holds two, the
        # center one. So 2t + z must be 0 mod 4 — the center can never sit
        # at 1 (2t + 1 is odd) and clears for its own price, and the pairs
        # parked at 1 must be even in number. A split pair re-tunes between
        # equal-cost states for free; otherwise one uniform pair pays 2 to
        # switch to its dearer value.
        if m % 2 == 1 and n % 2 == 1:
            cost += grid[m // 2][n // 2]
        if splits == 0 and uniforms % 2 == 1:
            cost += 2
        return cost
