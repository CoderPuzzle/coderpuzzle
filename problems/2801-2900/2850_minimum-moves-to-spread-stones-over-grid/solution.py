from typing import List


class Solution:
    def minimumMoves(self, grid: List[List[int]]) -> int:
        # Pair every empty cell with a cell still holding at least two
        # stones; the cost of a pair is the Manhattan distance between the
        # cells, and backtracking over all donor choices finds the cheapest
        # perfect pairing.
        empties = [(i, j) for i in range(3) for j in range(3) if grid[i][j] == 0]

        def fill(k: int) -> int:
            if k == len(empties):
                return 0
            i, j = empties[k]
            best = 99
            for r in range(3):
                for c in range(3):
                    if grid[r][c] >= 2:
                        grid[r][c] -= 1
                        best = min(best, abs(i - r) + abs(j - c) + fill(k + 1))
                        grid[r][c] += 1
            return best

        return fill(0)
