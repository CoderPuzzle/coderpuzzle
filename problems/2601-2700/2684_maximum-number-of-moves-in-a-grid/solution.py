from typing import List, Optional


class Solution:
    def maxMoves(self, grid: List[List[int]]) -> int:
        rows, columns = len(grid), len(grid[0])
        reachable = [True] * rows
        moves = 0
        for column in range(columns - 1):
            next_reachable = [False] * rows
            for row in range(rows):
                if not reachable[row]:
                    continue
                value = grid[row][column]
                for target in range(max(0, row - 1), min(rows, row + 2)):
                    if not next_reachable[target] and grid[target][column + 1] > value:
                        next_reachable[target] = True
            if not any(next_reachable):
                break
            reachable = next_reachable
            moves += 1
        return moves
