from typing import List, Optional


class Solution:
    def minPathCost(self, grid: List[List[int]], moveCost: List[List[int]]) -> int:
        rows, columns = len(grid), len(grid[0])
        costs = list(grid[0])
        for row in range(1, rows):
            previous = grid[row - 1]
            next_costs = []
            for column in range(columns):
                best = min(costs[source] + moveCost[previous[source]][column] for source in range(columns))
                next_costs.append(best + grid[row][column])
            costs = next_costs
        return min(costs)
