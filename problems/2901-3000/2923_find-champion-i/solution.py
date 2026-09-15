from typing import List, Optional


class Solution:
    def findChampion(self, grid: List[List[int]]) -> int:
        # The guarantees make "stronger than" a strict total order, so the
        # champion is simply its maximum. Keep the strongest team seen so
        # far and let every later team challenge it: one cell read decides
        # each challenge, and the survivor of all n - 1 of them never lost.
        champion = 0
        for team in range(1, len(grid)):
            if grid[team][champion] == 1:
                champion = team
        return champion
