from typing import List


class Solution:
    def minimumOperations(self, grid: List[List[int]]) -> int:
        # Vertical equality makes each column one constant value; horizontal
        # inequality only links adjacent columns. dp[v] = cheapest total for
        # processed columns ending with value v, extended over the ten
        # digits that grid cells may hold.
        m = len(grid)
        previous = [0] * 10
        for j in range(len(grid[0])):
            counts = [0] * 10
            for row in grid:
                counts[row[j]] += 1
            current = []
            for value in range(10):
                best_prev = min(previous[k] for k in range(10) if k != value)
                current.append(m - counts[value] + best_prev)
            previous = current
        return min(previous)
